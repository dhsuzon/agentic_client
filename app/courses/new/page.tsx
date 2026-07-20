"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, TextField, Input, Label } from "@heroui/react";
import { FiUpload, FiZap, FiRefreshCw, FiTag, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { createCourse } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

const AI_GENERATE_PROMPT = `Generate a detailed course syllabus and description for the topic: "{topic}".
Format as JSON with keys: title, description, syllabus: array of topic name strings, e.g. ["Introduction to X", "Core Concepts", "Advanced Topics"].`;

const AI_CLASSIFY_PROMPT = `Analyze this course and classify it.
Title: "{title}"
Description: "{description}"

Respond ONLY with JSON:
{
  "category": "one of: Web Development, Mobile Development, Data Science, Machine Learning, DSA & Algorithms, DevOps, Cybersecurity, Cloud Computing, UI/UX Design, Game Development, Programming, Android",
  "tags": ["3-5 relevant keyword tags"],
  "difficulty": "beginner | intermediate | advanced"
}`;

export default function AddCoursePage() {
  const router = useRouter();
  const { data: session, isPending: authLoading } = useSession();
  const [loading, setLoading] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [classifyLoading, setClassifyLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const callGemini = async (prompt: string) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash-lite:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );
    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini API error:", err);
      throw new Error(err);
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);
  };

  const formatSyllabus = (syllabus: any): string => {
    if (!Array.isArray(syllabus)) return String(syllabus);
    return syllabus.map((item: any) => {
      if (typeof item === "string") return item;
      return item.topic || item.title || item.name || item.week || JSON.stringify(item);
    }).join("\n");
  };

  const handleGenerate = async () => {
    setGenLoading(true);
    try {
      const topicInput = document.getElementById(
        "topicInput",
      ) as HTMLInputElement;
      const topic = topicInput?.value;
      if (!topic) {
        toast.error("Enter a topic first");
        setGenLoading(false);
        return;
      }
      const prompt = AI_GENERATE_PROMPT.replace("{topic}", topic);
      const parsed = await callGemini(prompt);
      if (parsed.title) {
        (document.getElementById("title") as HTMLInputElement).value =
          parsed.title;
      }
      if (parsed.description) {
        (document.getElementById("description") as HTMLTextAreaElement).value =
          parsed.description;
      }
      if (parsed.syllabus) {
        (document.getElementById("syllabus") as HTMLTextAreaElement).value =
          Array.isArray(parsed.syllabus)
            ? formatSyllabus(parsed.syllabus)
            : parsed.syllabus;
      }
      toast.success("Content generated!");
    } catch {
      toast.error("AI generation failed. Enter course details manually below.");
      setTimeout(() => {
        document
          .getElementById("title")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        (document.getElementById("title") as HTMLInputElement)?.focus();
      }, 300);
    } finally {
      setGenLoading(false);
    }
  };

  const handleClassify = async () => {
    const title = (document.getElementById("title") as HTMLInputElement)?.value;
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    )?.value;
    if (!title || !description) {
      toast.error("Fill in title and description first");
      return;
    }
    setClassifyLoading(true);
    try {
      const prompt = AI_CLASSIFY_PROMPT.replace("{title}", title).replace(
        "{description}",
        description,
      );
      const parsed = await callGemini(prompt);
      if (parsed.category) {
        const select = document.querySelector<HTMLSelectElement>(
          "select[name='category']",
        );
        if (select) select.value = parsed.category;
      }
      if (Array.isArray(parsed.tags)) {
        setTags(parsed.tags);
      }
      toast.success("Classification complete!");
    } catch {
      toast.error("Classification failed. Set category and tags manually.");
    } finally {
      setClassifyLoading(false);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    let imageUrl = "";
    if (imageFile) {
      try {
        const imgBB = new FormData();
        imgBB.append("image", imageFile);
        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          { method: "POST", body: imgBB },
        );
        const imgData = await imgRes.json();
        imageUrl = imgData.data?.url || "";
      } catch {
        toast.error("Image upload failed");
      }
    }

    try {
      await createCourse({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        price: Number(formData.get("price")) || 0,
        syllabus: formData.get("syllabus") as string,
        image: imageUrl,
        tags,
      });
      toast.success("Course created!");
      router.push("/courses/manage");
    } catch (err: any) {
      toast.error(err.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg">Sign in to add a course</p>
        <Button variant="primary" onPress={() => router.push("/login")}>
          Sign In
        </Button>
      </div>
    );
  }

  const categoriesList = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "DSA & Algorithms",
    "DevOps",
    "Cybersecurity",
    "Cloud Computing",
    "UI/UX Design",
    "Game Development",
    "Programming",
    "Android",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Course</h1>
        <p className="mt-1 text-foreground/60">
          Use AI to generate content or fill manually
        </p>
      </div>

      <form id="createCourseForm" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: AI Generator + Description + Syllabus */}
          <div className="space-y-6">
            <Card.Root className="border border-primary/20 bg-primary/5">
              <Card.Content className="flex flex-col gap-4 p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <FiZap className="text-primary" /> AI Content Generator
                </p>
                <div className="flex gap-2">
                  <TextField.Root className="flex-1">
                    <Input.Root
                      id="topicInput"
                      placeholder="Enter a topic (e.g., React for Beginners)"
                    />
                  </TextField.Root>
                  <Button
                    variant="secondary"
                    isDisabled={genLoading}
                    onPress={handleGenerate}
                    type="button"
                  >
                    {genLoading ? (
                      <FiRefreshCw className="animate-spin" />
                    ) : (
                      <FiZap />
                    )}
                    Generate
                  </Button>
                </div>
                <div className="border-t border-primary/10 pt-3">
                  <p className="mb-2 flex items-center gap-2 text-xs text-foreground/60">
                    <FiTag /> Auto Classification — suggest category & tags
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    isDisabled={classifyLoading}
                    onPress={handleClassify}
                    type="button"
                  >
                    {classifyLoading ? (
                      <FiRefreshCw className="animate-spin" />
                    ) : (
                      <FiTag />
                    )}
                    Classify
                  </Button>
                </div>
              </Card.Content>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Card.Title>Course Content</Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground/70">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    placeholder="Describe your course..."
                    className="w-full rounded-lg border border-default-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground/70">
                    Syllabus
                  </label>
                  <textarea
                    id="syllabus"
                    name="syllabus"
                    rows={10}
                    placeholder="Enter course syllabus (one topic per line)"
                    className="w-full rounded-lg border border-default-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </Card.Content>
            </Card.Root>
          </div>

          {/* Right Column: Title, Category, Price, Tags, Image, Submit */}
          <div className="space-y-6">
            <Card.Root>
              <Card.Header>
                <Card.Title>Course Details</Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-col gap-4">
                <TextField.Root isRequired>
                  <Label>Course Title</Label>
                  <Input.Root
                    id="title"
                    name="title"
                    placeholder="Enter course title"
                  />
                </TextField.Root>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground/70">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    className="h-10 w-full rounded-lg border border-default-200 bg-background px-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="">Select category</option>
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <TextField.Root>
                  <Label>Price ($)</Label>
                  <Input.Root name="price" type="number" placeholder="0 for free" />
                </TextField.Root>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground/70">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <FiX className="text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <TextField.Root className="flex-1">
                      <Input.Root
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                    </TextField.Root>
                    <Button variant="ghost" size="sm" onPress={addTag} type="button">
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/70">
                    Course Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-default-200 px-4 py-2 text-sm hover:bg-default-100">
                      <FiUpload />
                      Upload Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-16 w-24 rounded object-cover"
                      />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-foreground/40">
                    Upload to ImgBB. Max 5MB.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-4 w-full"
                  isDisabled={loading}
                >
                  Create Course
                </Button>
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </form>
    </div>
  );
}