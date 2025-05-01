
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Album } from "@/pages/Gallery";

interface AlbumCardProps {
  album: Album;
  onDelete: () => void;
  onNameChange: (newName: string) => void;
  onOpen: () => void;
}

const AlbumCard = ({ album, onDelete, onNameChange, onOpen }: AlbumCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(album.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editName.trim() !== album.name) {
      onNameChange(editName.trim() || "new");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onNameChange(editName.trim() || "new");
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditName(album.name);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <Card className="group overflow-hidden relative transition-all duration-300 hover:shadow-md">
      <div className="aspect-square relative">
        <img
          src={album.coverImage}
          alt={album.name}
          className="object-cover w-full h-full cursor-pointer"
          onClick={handleImageClick}
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
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full px-1 py-0.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ) : (
          <h3 
            className="font-medium truncate cursor-pointer"
            onDoubleClick={handleDoubleClick}
            title="Дважды кликните для редактирования"
          >
            {album.name}
          </h3>
        )}
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
