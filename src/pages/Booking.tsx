import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { services } from "@/lib/services";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays } from "lucide-react";

export default function Booking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", time: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please log in to book", variant: "destructive" });
      navigate("/login");
      return;
    }
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      name: form.name,
      phone: form.phone,
      service: form.service,
      date: form.date,
      time: form.time,
    });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Time slot taken", description: "That date and time is already booked. Please choose another.", variant: "destructive" });
      } else {
        toast({ title: "Booking failed", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Appointment booked!", description: "We'll see you soon." });
      navigate("/my-bookings");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full px-4 py-3.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 font-body";

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-12 fade-in-up">
          <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-accent/15">
            <CalendarDays size={24} className="text-accent" />
          </div>
          <h1 className="font-heading text-4xl font-bold mb-3">Book an Appointment</h1>
          <p className="text-muted-foreground text-sm">Fill in the details below and we'll confirm your booking.</p>
        </div>

        {!user && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 mb-8 text-center text-sm fade-in-up">
            Please <a href="/login" className="text-accent font-semibold hover:underline">log in</a> or{" "}
            <a href="/signup" className="text-accent font-semibold hover:underline">sign up</a> to book an appointment.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm fade-in-up delay-100">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Service</label>
            <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>{s.name} — ₹{s.price}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !user}
            className="w-full bg-accent text-accent-foreground py-4 text-sm font-semibold tracking-wide rounded-xl btn-scale disabled:opacity-50 disabled:transform-none"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
