import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Trash2, Clock, CheckCircle } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings">;

export default function MyBookings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true });
    if (error) {
      toast({ title: "Error loading bookings", variant: "destructive" });
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting booking", variant: "destructive" });
    } else {
      toast({ title: "Booking cancelled" });
      fetchBookings();
    }
  };

  if (loading) {
    return (
      <div className="pt-28 pb-20 text-center">
        <p className="text-muted-foreground">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10 fade-in-up">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">My Bookings</h1>
            <p className="text-muted-foreground text-sm mt-2">{bookings.length} appointment{bookings.length !== 1 ? "s" : ""}</p>
          </div>
          <Link to="/booking" className="bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold rounded-xl btn-scale">
            Book New
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground fade-in-up">
            <CalendarDays size={48} className="mx-auto mb-5 opacity-30" />
            <p className="text-xl font-heading font-semibold mb-2">No appointments yet</p>
            <p className="text-sm mb-6">Book your first appointment to get started.</p>
            <Link to="/booking" className="text-accent text-sm font-semibold hover:underline">Book Now →</Link>
          </div>
        ) : (
          <div className="grid gap-4 fade-in-up delay-100">
            {bookings.map((b) => (
              <div key={b.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-lift">
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold mb-1">{b.service}</h3>
                  <p className="text-sm text-muted-foreground">
                    {b.date} at {b.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                    b.status === "Pending"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                    {b.status === "Pending" ? <Clock size={12} /> : <CheckCircle size={12} />}
                    {b.status}
                  </span>
                  {b.status === "Pending" && (
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-2 rounded-xl hover:bg-destructive/10 transition-all duration-300 text-muted-foreground hover:text-destructive"
                      title="Cancel"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
