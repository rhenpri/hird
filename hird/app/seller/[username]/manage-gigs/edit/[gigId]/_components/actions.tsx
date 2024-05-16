"use client";

import {toast} from "sonner";
import { api } from "@/convex/_generated/api";
//import { Link2, Pencil, Trash2 } from "lucide-react";
import { store } from "@/convex/user";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
//import { Description } from '@/components/description';
import { Trash2 } from 'lucide-react';

import { ConfirmModal } from "@/app/seller/[username]/manage-gigs/_components/confirm-modal";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Button } from "@/components/ui/button";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    storageId: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    storageId
}: ActionsProps) => {
    //const {onOpen} = useRenameModal();
    const {mutate, pending} = useApiMutation(api.gig.remove);

    const onDelete = () => {
        mutate({ storageId })
            .then(() => toast.success("Gig deleted"))
            .catch(() => toast.error("Failed to delete gig"));
        };

    return (
        <div className="z-10 cursor-pointer text-black absoloute top-2 right-2">
            <ConfirmModal
                header="Delete Gig"
                description="Are you sure you want to delete this gig and all of its contents?"
                disabled={pending}
                onConfirm={onDelete}
            >

            <Button 
                variant="destructive"
                className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            >
             <Trash2 className="h-4 w-4 mr-2" />

            </Button>    
            </ConfirmModal>
        </div>
    );    
};
