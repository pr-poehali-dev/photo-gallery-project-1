
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Photo {
  id: string;
  url: string;
}

interface PhotoCardProps {
  photo: Photo;
  onDelete: () => void;
}

const PhotoCard = ({ photo, onDelete }: PhotoCardProps) => {
  return (
    <Card className="group overflow-hidden relative transition-all duration-300 hover:shadow-md">
      <div className="relative" style={{ paddingBottom: "150%" }}>  {/* Соотношение 2:3 */}
        <img
          src={photo.url}
          alt="Фото"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Icon name="Trash2" size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default PhotoCard;
