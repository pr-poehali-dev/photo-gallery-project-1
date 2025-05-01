
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Album {
  id: string;
  name: string;
  coverImage: string;
}

interface AlbumCardProps {
  album: Album;
  onDelete: () => void;
}

const AlbumCard = ({ album, onDelete }: AlbumCardProps) => {
  return (
    <Card className="group overflow-hidden relative transition-all duration-300 hover:shadow-md">
      <div className="aspect-square relative">
        <img
          src={album.coverImage}
          alt={album.name}
          className="object-cover w-full h-full"
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
      <CardContent className="p-3">
        <h3 className="font-medium truncate">{album.name}</h3>
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
