import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const sessionTypes = [
  {
    value: "Initial Consultation",
    label: "Initial Consultation",
    duration: "90 minutes",
  },
  {
    value: "Follow-Up Session",
    label: "Follow-Up Session",
    duration: "45 minutes",
  },
  {
    value: "Quick Check-In",
    label: "Quick Check-In",
    duration: "30 minutes",
  },
];

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    sessionType: "",
    notes: "",
  });

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: Date) => {
    setLoading(true);
    setSelectedTime("");
    
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      
      const { data, error } = await supabase.functions.invoke("get-available-slots", {
        body: { date: formattedDate },
      });

      if (error) throw error;

      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      toast.error("Failed to fetch available time slots");
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !formData.sessionType) {
      toast.error("Please select a date, time, and session type");
      return;
    }

    if (!formData.clientName || !formData.clientEmail) {
      toast.error("Please provide your name and email");
      return;
    }

    setSubmitting(true);

    try {
      const bookingData = {
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        sessionType: formData.sessionType,
        bookingDate: format(selectedDate, "yyyy-MM-dd"),
        bookingTime: selectedTime,
        notes: formData.notes,
      };

      const { data, error } = await supabase.functions.invoke("create-booking", {
        body: bookingData,
      });

      if (error) throw error;

      toast.success(data.message || "Booking confirmed!");
      
      // Reset form
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        sessionType: "",
        notes: "",
      });
      setSelectedDate(undefined);
      setSelectedTime("");
      setAvailableSlots([]);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast.error(error.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Personal Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="sessionType">Session Type *</Label>
              <Select
                value={formData.sessionType}
                onValueChange={(value) =>
                  setFormData({ ...formData, sessionType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label} ({type.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="clientName">Full Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientEmail">Email *</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={(e) =>
                  setFormData({ ...formData, clientPhone: e.target.value })
                }
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Any specific concerns or requirements..."
                rows={4}
              />
            </div>
          </div>

          {/* Right Column - Date & Time Selection */}
          <div className="space-y-4">
            <div>
              <Label>Select Date *</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < new Date() || date.getDay() === 0 || date.getDay() === 6
                }
                className="rounded-md border"
              />
            </div>

            {selectedDate && (
              <div>
                <Label>Available Time Slots *</Label>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={selectedTime === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(slot)}
                        className="text-xs"
                      >
                        {formatTimeSlot(slot)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">
                    No available slots for this date
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={submitting || !selectedDate || !selectedTime || !formData.sessionType}
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          * Required fields. You will receive a confirmation email with video call details.
        </p>
      </form>
    </Card>
  );
};

export default BookingCalendar;