"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { User } from 'next-auth'

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Review } from "@/lib/type"
import ReviewCard from "../productDetail/ReviewCard"

export function CollapsibleDemo({ reviews, loggedInUser }: { reviews: Review[], loggedInUser: User | undefined | null }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
      <h4 className="my-4 font-semibold">{reviews.length < 2 ? 'Review' : 'Reviews'} ({reviews.length})</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {!isOpen && <ReviewCard key={reviews[0].id} review={reviews[0]} loggedInUser={loggedInUser} />}
      <CollapsibleContent className="flex flex-col gap-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} loggedInUser={loggedInUser} />
      ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
