import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Upload, LogOut, Image, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ADMIN_PIN = "188199";

interface GalleryPhoto {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
}

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  created_at: string;
}

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Review form
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [addingReview, setAddingReview] = useState(false);

  useEffect(() => {
    if (authenticated) {
      window.scrollTo(0, 0);
      fetchPhotos();
      fetchReviews();
    }
  }, [authenticated]);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setPhotos(data);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setReviews(data);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      toast.success("Welcome, Admin!");
    } else {
      toast.error("Incorrect PIN");
      setPin("");
    }
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from("gallery_photos")
      .insert({ title: title || file.name, image_url: urlData.publicUrl });

    if (dbError) {
      toast.error("Failed to save: " + dbError.message);
    } else {
      toast.success("Photo uploaded!");
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
      fetchPhotos();
    }
    setUploading(false);
  };

  const handleDelete = async (photo: GalleryPhoto) => {
    const fileName = photo.image_url.split("/gallery/")[1];
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }
    await supabase.from("gallery_photos").delete().eq("id", photo.id);
    toast.success("Photo deleted");
    fetchPhotos();
  };

  const handleAddReview = async () => {
    if (!reviewName.trim() || !reviewText.trim()) {
      toast.error("Please fill in name and review text");
      return;
    }
    setAddingReview(true);
    const { error } = await supabase
      .from("reviews")
      .insert({ name: reviewName.trim(), text: reviewText.trim(), rating: reviewRating });

    if (error) {
      toast.error("Failed to add review: " + error.message);
    } else {
      toast.success("Review added!");
      setReviewName("");
      setReviewText("");
      setReviewRating(5);
      fetchReviews();
    }
    setAddingReview(false);
  };

  const handleDeleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    toast.success("Review deleted");
    fetchReviews();
  };

  if (!authenticated) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center bg-cream">
        <form onSubmit={handlePinSubmit} className="bg-background rounded-xl shadow-md p-8 w-full max-w-sm text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-blush flex items-center justify-center">
            <Image className="text-primary" size={24} />
          </div>
          <h1 className="font-heading text-2xl font-bold">Admin Access</h1>
          <p className="text-muted-foreground text-sm">Enter PIN to continue</p>
          <Input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="text-center text-lg tracking-widest"
            maxLength={6}
          />
          <Button type="submit" className="w-full rounded-full">Enter</Button>
        </form>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-cream">
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={() => setAuthenticated(false)}>
            <LogOut size={16} className="mr-1" /> Logout
          </Button>
        </div>

        {/* Upload Photo Section */}
        <div className="bg-background rounded-xl shadow-sm p-6 mb-8 space-y-4">
          <h2 className="font-heading text-lg font-semibold">Upload New Photo</h2>
          <Input
            placeholder="Photo title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:opacity-90"
          />
          <Button onClick={handleUpload} disabled={uploading} className="rounded-full">
            <Upload size={16} className="mr-2" />
            {uploading ? "Uploading..." : "Upload Photo"}
          </Button>
        </div>

        {/* Photos Grid */}
        <h2 className="font-heading text-lg font-semibold mb-4">
          Uploaded Photos ({photos.length})
        </h2>
        {photos.length === 0 ? (
          <p className="text-muted-foreground text-sm mb-8">No photos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group rounded-lg overflow-hidden bg-background shadow-sm">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    onClick={() => handleDelete(photo)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                {photo.title && (
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground truncate">{photo.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Review Section */}
        <div className="bg-background rounded-xl shadow-sm p-6 mb-8 space-y-4">
          <h2 className="font-heading text-lg font-semibold">Add New Review</h2>
          <Input
            placeholder="Client name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
          />
          <Textarea
            placeholder="Review text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    size={20}
                    className={star <= reviewRating ? "fill-accent text-accent" : "text-muted-foreground"}
                  />
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleAddReview} disabled={addingReview} className="rounded-full">
            <Plus size={16} className="mr-2" />
            {addingReview ? "Adding..." : "Add Review"}
          </Button>
        </div>

        {/* Reviews List */}
        <h2 className="font-heading text-lg font-semibold mb-4">
          Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-sm">No reviews added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-background rounded-xl p-5 shadow-sm relative group">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic mb-2">"{review.text}"</p>
                <p className="font-medium text-sm">{review.name}</p>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
