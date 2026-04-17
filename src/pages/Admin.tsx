import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Trash2, CheckCircle, Clock, ShieldCheck, Users, CalendarDays } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings">;

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      if (!authLoading) navigate("/login");
    }
  }, [user, isAdmin, authLoading]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });
    if (error) {
      toast({ title: "Error loading bookings", variant: "destructive" });
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchBookings();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting booking", variant: "destructive" });
    } else {
      toast({ title: "Booking deleted" });
      fetchBookings();
    }
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Pending" ? "Done" : "Pending";
    const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      fetchBookings();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="pt-28 pb-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-28 pb-20 text-center">
        <p className="text-muted-foreground">Access denied. Admin only.</p>
      </div>
    );
  }

  const pending = bookings.filter((a) => a.status === "Pending");
  const done = bookings.filter((a) => a.status === "Done");

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/15">
              <ShieldCheck size={20} className="text-accent" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 ml-[52px]">Manage all salon appointments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 fade-in-up delay-100">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">Total</span>
            </div>
            <p className="text-3xl font-bold font-heading">{bookings.length}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={18} className="text-amber-500" />
              <span className="text-sm text-muted-foreground font-medium">Pending</span>
            </div>
            <p className="text-3xl font-bold font-heading text-amber-600">{pending.length}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle size={18} className="text-emerald-500" />
              <span className="text-sm text-muted-foreground font-medium">Completed</span>
            </div>
            <p className="text-3xl font-bold font-heading text-emerald-600">{done.length}</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground fade-in-up">
            <Users size={48} className="mx-auto mb-5 opacity-30" />
            <p className="text-xl font-heading font-semibold mb-2">No appointments yet</p>
            <p className="text-sm">Bookings will appear here once customers schedule them.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden fade-in-up delay-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="py-4 px-6 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Name</th>
                    <th className="py-4 px-6 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Phone</th>
                    <th className="py-4 px-6 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Service</th>
                    <th className="py-4 px-6 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Time</th>
                    <th className="py-4 px-6 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((appt) => (
                    <tr key={appt.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6 font-medium">{appt.name}</td>
                      <td className="py-4 px-6 text-muted-foreground">{appt.phone}</td>
                      <td className="py-4 px-6">{appt.service}</td>
                      <td className="py-4 px-6 text-muted-foreground">{appt.date}</td>
                      <td className="py-4 px-6 text-muted-foreground">{appt.time}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                          appt.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {appt.status === "Pending" ? <Clock size={12} /> : <CheckCircle size={12} />}
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggle(appt.id, appt.status)}
                            className="p-2 rounded-xl hover:bg-accent/15 transition-all duration-300 text-muted-foreground hover:text-accent"
                            title={appt.status === "Pending" ? "Mark as done" : "Mark as pending"}
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(appt.id)}
                            className="p-2 rounded-xl hover:bg-destructive/10 transition-all duration-300 text-muted-foreground hover:text-destructive"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
