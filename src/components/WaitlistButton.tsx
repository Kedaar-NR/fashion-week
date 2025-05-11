
import { useState } from "react";
import { Mail } from "lucide-react";
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormSuccess,
} from "@/components/ui/popover-form";
import WaitlistCounter from "./WaitlistCounter";

const WaitlistButton = () => {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle"
  );
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
      setFormState("idle");
      setEmail("");
    }, 3300);
  }

  return (
    <div className="flex items-center justify-center py-6">
      <PopoverForm
        title="Join Waitlist"
        open={open}
        setOpen={setOpen}
        width="320px"
        showCloseButton={formState !== "success"}
        showSuccess={formState === "success"}
        openChild={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              submit();
            }}
            className="p-4"
          >
            <div className="mb-4 space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="text-muted-foreground size-4" />
                </div>
              </div>
              <p className="text-muted-foreground text-xs tracking-tight">
                Be the first to know when we launch.
              </p>
            </div>
            <PopoverFormButton
              loading={formState === "loading"}
              text="Join Waitlist"
            />
          </form>
        }
        successChild={
          <PopoverFormSuccess
            title="You're on the list!"
            description="Thank you for joining our waitlist. We'll be in touch soon."
          />
        }
      />
    </div>
  );
};

export default WaitlistButton;
