"use client";

import { useState } from "react";
import { Button, Card, TextField, Input, Label } from "@heroui/react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const channels = [
  { icon: FiMail, title: "Email", desc: "diderhossainsuzon@gmail.com", href: "mailto:diderhossainsuzon@gmail.com" },
  { icon: FiPhone, title: "Phone", desc: "01871601665", href: "tel:01871601665" },
  { icon: FiMapPin, title: "Office", desc: "Jalalabad" },
];

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("Message sent! We'll get back to you soon.");
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-foreground dark:text-white">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-foreground/60">
          Have a question or feedback? We would love to hear from you.
        </p>
      </div>

      <div className="mb-12 grid gap-6 sm:grid-cols-3">
        {channels.map((ch) => (
          <Card.Root key={ch.title} className="rounded-xl">
            <Card.Content className="flex flex-col items-center gap-2 py-8 text-center">
              <ch.icon className="text-2xl text-primary" />
              <p className="font-semibold">{ch.title}</p>
              {ch.href ? (
                <a href={ch.href} className="text-sm text-primary hover:underline">
                  {ch.desc}
                </a>
              ) : (
                <p className="text-sm text-foreground/60">{ch.desc}</p>
              )}
            </Card.Content>
          </Card.Root>
        ))}
      </div>

      <Card.Root className="mx-auto max-w-2xl rounded-xl">
        <Card.Header>
          <Card.Title>Send us a message</Card.Title>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField.Root isRequired>
              <Label>Name</Label>
              <Input.Root name="name" placeholder="Your name" />
            </TextField.Root>
            <TextField.Root isRequired>
              <Label>Email</Label>
              <Input.Root name="email" type="email" placeholder="you@example.com" />
            </TextField.Root>
            <TextField.Root isRequired>
              <Label>Subject</Label>
              <Input.Root name="subject" placeholder="What's this about?" />
            </TextField.Root>
            <div>
              <label className="mb-1 block text-sm font-medium">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us more..."
                className="w-full rounded-lg border border-default-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full" isDisabled={sending}>
              <FiSend /> {sending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
