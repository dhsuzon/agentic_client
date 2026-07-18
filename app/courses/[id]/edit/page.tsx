"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, TextField, Input, Label } from "@heroui/react";
import { FiUpload, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { getCourseById, updateCourse } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending: authLoading } = useSession();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const { data, isLoading: courseLoading, error } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!session,
  });

  const course = data?.course;

  useEffect(() => {
    if (course?.image) {
      setImagePreview(course.image);
    }
  }, [course]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    let imageUrl = course?.image || "";
    if (imageFile) {
      try {
        const imgBB = new FormData();
        imgBB.append("image", imageFile);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          { method: "POST", body: imgBB }
        );
        const imgData = await res.json();
        imageUrl = imgData.data?.url || imageUrl;
      } catch {
        toast.error("Image upload failed");
      }
    }

    try {
      await updateCourse(id, {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        price: Number(formData.get("price")) || 0,
        syllabus: formData.get("syllabus") as string,
        image: imageUrl,
      });
      toast.success("Course updated!");
      router.push("/courses/manage");
    } catch (err: any) {
      toast.error(err.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || courseLoading) return null;

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg">Sign in to edit courses</p>
        <Button variant="primary" onPress={() => router.push("/login")}>
          Sign In
        </Button>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg">Course not found</p>
        <Button variant="ghost" onPress={() => router.push("/courses/manage")}>
          Back to My Courses
        </Button>
      </div>
    );
  }

  if (course.ownerId !== session.user.id) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg">You don&apos;t have permission to edit this course</p>
        <Button variant="ghost" onPress={() => router.push("/courses/manage")}>
          Back to My Courses
        </Button>
      </div>
    );
  }

  const categoriesList = [
    "Development",
    "Design",
    "AI & Machine Learning",
    "Data Science",
    "Business",
    "Marketing",
    "Other",
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onPress={() => router.push("/courses/manage")}
      >
        <FiArrowLeft /> Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Course</h1>
      </div>

      <Card.Root>
        <Card.Header>
          <Card.Title>Course Details</Card.Title>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField.Root isRequired>
              <Label>Course Title</Label>
              <Input.Root
                name="title"
                required
                defaultValue={course.title}
                placeholder="Enter course title"
              />
            </TextField.Root>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground/70">
                Description
              </label>
              <textarea
                name="description"
                required
                defaultValue={course.description}
                rows={4}
                className="w-full rounded-lg border border-default-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground/70">
                Category
              </label>
              <select
                name="category"
                defaultValue={course.category}
                className="h-10 w-full rounded-lg border border-default-200 bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <TextField.Root>
              <Label>Price ($)</Label>
              <Input.Root
                name="price"
                type="number"
                defaultValue={String(course.price)}
              />
            </TextField.Root>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground/70">
                Syllabus
              </label>
              <textarea
                name="syllabus"
                defaultValue={course.syllabus || ""}
                rows={5}
                className="w-full rounded-lg border border-default-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground/70">
                Course Image
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-default-200 px-4 py-2 text-sm hover:bg-default-100">
                  <FiUpload />
                  Upload New Image
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
            </div>

            <Button
              type="submit"
              variant="primary"
              className="mt-4 w-full"
              isDisabled={loading}
            >
              Update Course
            </Button>
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
