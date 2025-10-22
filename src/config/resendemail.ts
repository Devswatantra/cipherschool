import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email, subject, rectTemplate) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Cipher Editor <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      react: rectTemplate,
    });

    if (error) {
      return error;
    }

    return data;
    console.log("Email sent successfully:", data);
  } catch (error) {
    return error;
  }
};
