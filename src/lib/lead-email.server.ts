// Server-only helper: sends lead notification emails via Resend.
const RESEND_URL = "https://api.resend.com/emails";
const RECIPIENTS = ["sirica.sophrologie@gmail.com", "davhuin@gmail.com"];
const FROM = "Axe Réflexe <notifications@axereflexe.fr>";

export async function sendLeadEmail(subject: string, html: string): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error("[lead-email] RESEND_API_KEY manquante");
    return;
  }
  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from: FROM, to: RECIPIENTS, subject, html }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[lead-email] Resend error ${res.status}: ${body}`);
    }
  } catch (e) {
    console.error("[lead-email] envoi impossible:", e);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function leadRow(label: string, value: string | null | undefined): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;font-weight:bold;color:#111;border-bottom:1px solid #eee;vertical-align:top;">${label}</td>
    <td style="padding:8px 12px;color:#333;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`;
}

export function leadEmailHtml(title: string, rows: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:24px auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="background:#0f172a;padding:16px 24px;">
      <span style="color:#d4e157;font-weight:bold;font-size:14px;letter-spacing:1px;">AXE RÉFLEXE</span>
    </div>
    <div style="padding:24px;">
      <h1 style="margin:0 0 16px;font-size:18px;color:#111;">${title}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
      <p style="margin:20px 0 0;font-size:12px;color:#888;">Retrouvez ce lead dans l'admin : axereflexe.fr/admin</p>
    </div>
  </div>
</body>
</html>`;
}
