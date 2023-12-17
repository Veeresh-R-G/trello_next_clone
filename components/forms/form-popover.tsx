"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { UseAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from 'sonner';
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FormPicker } from "./form-picker";


interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number
}

export const FormPopover = ({
    children,
    side = "bottom",
    align = "center",
    sideOffset = 0
}: FormPopoverProps) => {


    const { execute, fieldErrors } = UseAction(createBoard, {
        onSuccess: (data) => {
            console.log({ data })
            toast.success("Board Created")
        },
        onError: (err) => {
            console.log({ err })
            toast.error(err)
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title })
    }
    return (
        <Popover>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>

                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">

                        <FormPicker
                            id="image"
                            errors={fieldErrors}
                        />
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}