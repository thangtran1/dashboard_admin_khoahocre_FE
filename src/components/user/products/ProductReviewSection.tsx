import { useState } from "react";
import { StarIcon, Camera, X, Send, LogIn, MessageCircle, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { Link } from "react-router";
import { useUserInfo, useUserToken } from "@/store/userStore";
import { toast } from "sonner";
import { Button } from "antd";
import { Textarea } from "@/ui/textarea";

// ------------------- Stars Component -------------------
const Stars = ({ value, size = 14, interactive, onRate, hover, onHover }: any) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <button
        key={s}
        type="button"
        disabled={!interactive}
        onClick={() => onRate?.(s)}
        onMouseEnter={() => onHover?.(s)}
        onMouseLeave={() => onHover?.(0)}
        className={interactive ? "hover:scale-110" : ""}
      >
        <StarIcon
          size={size}
          className={s <= (hover || value) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}
        />
      </button>
    ))}
  </div>
);

// ------------------- Review Card -------------------
const ReviewCard = ({ review, canReply, onReply }: { review: any; canReply: boolean; onReply: (id: string, text: string) => void }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showAllReplies, setShowAllReplies] = useState(false);
  const submitReply = () => {
    if (!replyText.trim()) return;
    onReply(review._id, replyText);
    setReplyText("");
    setReplyFormOpen(false);
    setShowReplies(true);
  };

  const replies = review.replies || [];

  return (
    <div className="p-4 rounded-xl border border-border">
      <div className="flex gap-3">
        <img src="/images/avatar/avatar-default.png" className="w-10 h-10 rounded-full border-2 object-cover" />
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold text-sm">{review.user.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars value={review.rating} />
                {review.type && <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{review.type}</span>}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
          </div>

          {/* Comment & Images */}
          <p className="mt-2 text-sm">{review.comment}</p>
          {review.images?.length > 0 && (
            <div className="flex gap-2 mt-2">
              {review.images.map((img: string, i: number) => (
                <img key={i} src={img} className="w-16 h-16 object-cover rounded border" />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-3 text-xs">
            {canReply && (
              <button onClick={() => setReplyFormOpen(!replyFormOpen)} className="text-primary flex items-center gap-1">
                <MessageCircle size={14} /> Phản hồi
              </button>
            )}
            {replies.length > 0 && (
              <button onClick={() => setShowReplies(!showReplies)} className="text-muted-foreground flex items-center gap-1">
                {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />} {replies.length} phản hồi
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyFormOpen && (
            <div className="mt-3 flex gap-2">
              <input
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitReply()}
                placeholder="Viết phản hồi..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg bg-muted"
              />
              <button onClick={submitReply} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg">
                <Send size={14} />
              </button>
            </div>
          )}

          {showReplies && replies.length > 0 && (
            <div className="mt-2 ml-2 pl-3 border-l-2 border-border/50">
              {(showAllReplies ? replies : replies.slice(0, 3)).map((r: any) => (
                <div key={r._id} className="flex gap-3 py-3 border-t border-border/50 first:border-0">
                  <img src="/images/avatar/avatar-default.png" className="w-8 h-8 rounded-full border object-cover" />
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{r.user.name}</span>
                      {r.user.isAdmin && <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded flex items-center gap-1"><Shield size={10} />Admin</span>}
                      <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <p className="text-sm mt-1">{r.comment}</p>
                  </div>
                </div>
              ))}
              {replies.length > 3 && !showAllReplies && (
                <button
                  onClick={() => setShowAllReplies(true)}
                  className="text-xs text-primary mt-2"
                >
                  Xem thêm {replies.length - 3} phản hồi
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ------------------- Main Component -------------------
export default function ProductReviewSection({ reviews, productName }: any) {
  const { accessToken } = useUserToken();
  const user = useUserInfo();
  const isLogged = Boolean(accessToken);
  const isAdmin = user?.role === "admin";
  const userId = user?.id || "";

  // State
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allReviews, setAllReviews] = useState<any[]>(reviews);

  // Derived data
  const avgRating = allReviews.length ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1) : "0";
  const counts = [5, 4, 3, 2, 1].map(s => ({ s, c: allReviews.filter(r => r.rating === s).length }));
  const labels = ["", "Rất tệ 😞", "Tệ 😕", "Bình thường 😐", "Tốt 😊", "Tuyệt vời 🤩"];

  // Submit new review
  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return toast.error("Chọn số sao!");
    if (!comment.trim()) return toast.error("Nhập nội dung!");
    setLoading(true);

    // Fake API delay
    await new Promise(r => setTimeout(r, 500));

    setAllReviews([
      {
        _id: `r_${Date.now()}`,
        rating,
        comment,
        images,
        createdAt: new Date(),
        user: { _id: userId, name: user?.username || "Bạn" },
        type: "Đã mua hàng",
        replies: []
      },
      ...allReviews
    ]);

    setRating(0);
    setComment("");
    setImages([]);
    setLoading(false);
    toast.success("Đã gửi!");
  };

  // Add reply to review
  const addReply = (id: string, text: string) => {
    setAllReviews(allReviews.map(r => r._id === id ? {
      ...r,
      replies: [...(r.replies || []), {
        _id: `rp_${Date.now()}`,
        comment: text,
        createdAt: new Date(),
        user: { _id: userId, name: user?.username || "Bạn", isAdmin }
      }]
    } : r));
    toast.success("Đã phản hồi!");
  };

  return (
    <div className="space-y-5">

      {/* Overview */}
      <div className="rounded-xl p-5 border flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:border-r md:pr-6">
          <div className="text-4xl font-bold text-primary">{avgRating}</div>
          <Stars value={Math.round(+avgRating)} size={18} />
          <p className="text-sm text-muted-foreground mt-1">{allReviews.length} đánh giá</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {counts.map(({ s, c }) => (
            <div key={s} className="flex items-center gap-2 text-sm">
              <span className="w-6">{s}⭐</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: allReviews.length ? `${c / allReviews.length * 100}%` : 0 }} />
              </div>
              <span className="w-6 text-muted-foreground">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {isLogged ? (
        <form onSubmit={submitReview} className="rounded-xl p-5 border border-success space-y-3">
          <h3 className="font-semibold">✍️ Viết đánh giá</h3>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium">Đánh giá *</label>
            <div className="flex items-center gap-2 mt-1">
              <Stars value={rating} hover={hover} size={28} interactive onRate={setRating} onHover={setHover} />
              <span className="text-sm text-muted-foreground">{labels[rating]}</span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium">Nội dung *</label>
            <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder={`Chia sẻ về ${productName}...`} className="mt-1" rows={3} />
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium">Hình ảnh</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} className="w-16 h-16 object-cover rounded border" />
                  <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
                    <X size={12} className="mx-auto" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="w-16 h-16 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:border-primary">
                  <Camera size={18} className="text-muted-foreground" />
                  <input type="file" accept="image/*" multiple onChange={e => {
                    if (e.target.files) setImages([...images, ...Array.from(e.target.files).map((_, i) => `/images/products/product_${(i % 5) + 1}.png`)].slice(0, 5));
                  }} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Submit */}
          <button disabled={loading} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 disabled:opacity-50">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={16} />} Gửi
          </button>
        </form>
      ) : (
        <div className="rounded-xl p-6 border text-center">
          <LogIn size={40} className="mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-semibold mb-1">Đăng nhập để đánh giá</h3>
          <p className="text-sm text-muted-foreground mb-3">Chia sẻ trải nghiệm của bạn</p>
          <Link to="/login"><Button type="primary" icon={<LogIn size={16} />}>Đăng nhập</Button></Link>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-3">
        <h3 className="font-semibold">Tất cả đánh giá ({allReviews.length})</h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {allReviews.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">📝 Chưa có đánh giá</div>
          ) : (
            allReviews.map(r => (
              <ReviewCard key={r._id} review={r} canReply={isAdmin || r.user._id === userId} onReply={addReply} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
