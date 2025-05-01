
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import AlbumCard from "@/components/AlbumCard";

interface Album {
  id: string;
  name: string;
  coverImage: string;
}

const Gallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [gridColumns, setGridColumns] = useState<number>(4);

  const createAlbum = () => {
    const newAlbum: Album = {
      id: Date.now().toString(),
      name: "new",
      coverImage: "https://source.unsplash.com/random/300x300?album",
    };
    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
  };

  const deleteAlbum = (id: string) => {
    setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
  };

  const deleteAllAlbums = () => {
    setAlbums([]);
  };

  const handleSliderChange = (value: number[]) => {
    setGridColumns(value[0]);
  };

  const gridClasses = `grid grid-cols-${gridColumns} gap-4`;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Фотогалерея</h1>
        <div className="flex gap-4">
          <Button onClick={createAlbum} className="bg-primary">
            <Icon name="Plus" />
            Создать альбом
          </Button>
          <Button 
            onClick={deleteAllAlbums} 
            variant="destructive" 
            disabled={albums.length === 0}
          >
            <Icon name="Trash2" />
            Удалить все
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <span className="font-medium">Альбомов в ряду: {gridColumns}</span>
            <div className="w-1/3">
              <Slider
                defaultValue={[4]}
                min={3}
                max={8}
                step={1}
                onValueChange={handleSliderChange}
              />
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>3</span>
              <span className="flex-1"></span>
              <span>8</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-${gridColumns} gap-4`}>
        {albums.map((album) => (
          <AlbumCard 
            key={album.id} 
            album={album} 
            onDelete={() => deleteAlbum(album.id)}
          />
        ))}
      </div>

      {albums.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-4">Нет альбомов</p>
          <Button onClick={createAlbum} variant="outline">
            Создать первый альбом
          </Button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
