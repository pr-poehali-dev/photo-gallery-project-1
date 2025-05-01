
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-black">Фотогалерея</h1>
        <p className="text-xl text-gray-600 mb-6">Управляйте своими фотоальбомами</p>
        <Button asChild size="lg">
          <Link to="/gallery"><Icon name="Image" className="mr-2" />Перейти в галерею</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;

