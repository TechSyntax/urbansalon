import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please check your email to confirm, then log in." });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-background via-secondary to-background">
      <div className="w-full max-w-md fade-in-up">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-accent/20 border border-accent/30">
              <UserPlus size={24} className="text-accent" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">Create Account</h1>
            <p className="text-muted-foreground text-sm">Sign up to book appointments online.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-3.5 text-sm bg-card/80 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 text-sm bg-card/80 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-4 py-3.5 text-sm bg-card/80 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 font-body"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground py-3.5 text-sm font-semibold rounded-xl btn-scale disabled:opacity-50 disabled:transform-none"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
            <p className="text-sm text-muted-foreground text-center pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
