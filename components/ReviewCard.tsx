"use client";

import { Card } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import StarRating from "./StarRating";

interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onDelete?: (id: string) => void;
}

export default function ReviewCard({ review, currentUserId, onDelete }: ReviewCardProps) {
  return (
    <Card.Root className="rounded-xl transition-shadow hover:shadow-lg">
      <Card.Content className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {review.userName?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-sm font-medium">{review.userName}</p>
              <p className="text-xs text-foreground/50 dark:text-muted">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>
        {review.comment && (
          <p className="text-sm text-foreground/80 dark:text-muted leading-relaxed">
            {review.comment}
          </p>
        )}
        {currentUserId === review.userId && onDelete && (
          <button
            onClick={() => onDelete(review._id)}
            className="mt-2 flex items-center gap-1 text-xs text-danger hover:underline"
          >
            <FiTrash2 className="text-[10px]" /> Delete
          </button>
        )}
      </Card.Content>
    </Card.Root>
  );
}
