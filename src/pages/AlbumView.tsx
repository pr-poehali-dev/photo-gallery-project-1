
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { Album } from "@/pages/Gallery";
import PhotoCard from "@/components/PhotoCard";

interface Photo {
  id: string;
  url: string;
}

const AlbumView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [gridColumns, setGridColumns] = useState<number>(4);
  const [gapSize, setGapSize] = useState<number>(4);

  // В реальном приложении здесь был бы запрос к API для получения данных
  useEffect(() => {
    // Имитация получения данных альбома из хранилища
    setAlbum({
      id: id || "",
      name: "Мой альбом",
      coverImage: "https://source.unsplash.com/random/300x300?album"
    });
  }, [id]);

  const addPhoto = () => {
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url: `https://source.unsplash.com/random/600x900?photo=${Date.now()}`,
    };
    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
  };

  const deletePhoto = (id: string) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

  const deleteAllPhotos = () => {
    setPhotos([]);
  };

  const handleColumnsChange = (value: number[]) => {
    setGridColumns(value[0]);
  };

  const handleGapChange = (value: number[]) => {
    setGapSize(value[0]);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!album) {
    return <div className="container mx-auto p-6">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" onClick={goBack} className="mr-2">
          <Icon name="ArrowLeft" className="mr-1" />
          Назад
        </Button>
        <h1 className="text-3xl font-bold">{album.name}</h1>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Button onClick={addPhoto} className="bg-primary">
            <Icon name="Plus" className="mr-2" />
            Добавить фото
          </Button>
          <Button 
            onClick={deleteAllPhotos} 
            variant="destructive" 
            disabled={photos.length === 0}
          >
            <Icon name="Trash2" className="mr-2" />
            Удалить все фото
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <span className="font-medium min-w-32">Фото в ряду: {gridColumns}</span>
              <div className="flex-1">
                <Slider
                  defaultValue={[4]}
                  value={[gridColumns]}
                  min={2}
                  max={6}
                  step={1}
                  onValueChange={handleColumnsChange}
                />
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground min-w-12">
                <span>2</span>
                <span className="flex-1"></span>
                <span>6</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-medium min-w-32">Отступ: {gapSize}</span>
              <div className="flex-1">
                <Slider
                  defaultValue={[4]}
                  value={[gapSize]}
                  min={1}
                  max={8}
                  step={1}
                  onValueChange={handleGapChange}
                />
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground min-w-12">
                <span>1</span>
                <span className="flex-1"></span>
                <span>8</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div 
        className="grid" 
        style={{ 
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          gap: `${gapSize * 0.25}rem`
        }}
      >
        {photos.map((photo) => (
          <PhotoCard 
            key={photo.id} 
            photo={photo} 
            onDelete={() => deletePhoto(photo.id)}
          />
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-4">В этом альбоме нет фотографий</p>
          <Button onClick={addPhoto} variant="outline">
            Добавить первое фото
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlbumView;
