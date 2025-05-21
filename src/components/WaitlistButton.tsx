import { useState } from "react";
import { Mail } from "lucide-react";
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormSuccess,
} from "@/components/ui/popover-form";
import WaitlistCounter from "./WaitlistCounter";

// ---
// Google Apps Script Web App endpoint for email collection
// 1. Go to your Google Sheet > Extensions > Apps Script
// 2. Paste the following code and deploy as a web app (access: Anyone)
//
// function doPost(e) {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   var data = JSON.parse(e.postData.contents);
//   sheet.appendRow([new Date(), data.email]);
//   return ContentService.createTextOutput(
//     JSON.stringify({ result: "success" })
//   ).setMimeType(ContentService.MimeType.JSON);
// }
//
// 3. Copy the web app URL and paste it below:
const APPS_SCRIPT_ENDPOINT = "PASTE_YOUR_WEB_APP_URL_HERE";
// ---

const WaitlistButton = () => {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle"
  );
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  async function submit() {
    setFormState("loading");
    try {
      // Send email as JSON to Apps Script endpoint
      const response = await fetch(APPS_SCRIPT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Optionally check response if not using no-cors
      setFormState("success");
    } catch (e) {
      alert("Failed to join waitlist. Please try again.");
      setFormState("idle");
      return;
    }
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
