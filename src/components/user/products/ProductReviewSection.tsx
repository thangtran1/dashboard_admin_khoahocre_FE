import { useState } from "react";
import {
  X,
  Send,
  LogIn,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import { Link } from "react-router";
import { useUserInfo, useUserToken } from "@/store/userStore";
import { toast } from "sonner";
import { Button, Input, Rate } from "antd";
import { Textarea } from "@/ui/textarea";
import { productService } from "@/api/services/product";
import { PlusOutlined } from "@ant-design/icons";

const Stars = ({
  value,
  interactive = false,
  onRate,
  size = 14,
}: {
  value: number;
  interactive?: boolean;
  onRate?: (value: number) => void;
  size?: number;
}) => (
  <Rate
    value={value}
    onChange={onRate}
    disabled={!interactive}
    style={{ fontSize: size }}
  />
);

const ReviewCard: React.FC<any> = ({ review, canReply, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showAllReplies, setShowAllReplies] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const replies: any[] = review.replies || [];

  const submitReply = () => {
    if (!replyText.trim()) return;
    onReply(review._id, replyText);
    setReplyText("");
    setReplyFormOpen(false);
    setShowReplies(true);
  };

  return (
    <div className="p-4 rounded-xl border border-border">
      <div className="flex gap-3">
        <img
          src={`${API_URL}/${review.user?.avatar || "uploads/avatar-default.png"}`}
          alt={review.user?.name || "Người dùng"}
          className="w-10 h-10 rounded-full border-2 object-cover"
        />

        <div className="flex-1">
          <div className="flex justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold text-sm">{review.user?.name || "Người dùng"}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars value={review.rating} />
                {review.type && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    {review.type}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <p className="mt-2 text-sm">{review.comment}</p>

          {review.images?.length > 0 && (
            <div className="flex gap-2 mt-2">
              {review.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-3 text-xs">
            {canReply && (
              <button
                onClick={() => setReplyFormOpen(!replyFormOpen)}
                className="text-primary cursor-pointer flex items-center gap-1"
              >
                <MessageCircle size={14} /> Phản hồi
              </button>
            )}
            {replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-muted-foreground cursor-pointer flex items-center gap-1"
              >
                {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}{" "}
                {replies.length} phản hồi
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyFormOpen && (
            <div className="mt-3 flex gap-2">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitReply()}
                placeholder="Viết phản hồi..."
              />
              <Button
                onClick={submitReply}
                type="primary"
                icon={<Send size={15} />}
                size="large"
                className="shrink-0"
              />
            </div>
          )}

          {/* Replies List */}
          {showReplies && replies.length > 0 && (
            <div className="mt-2 ml-2 pl-3 border-l-2 border-border/50">
              {(showAllReplies ? replies : replies.slice(0, 3)).map((reply: any) => (
                <div
                  key={reply._id}
                  className="flex gap-3 py-3 border-t border-border/50 first:border-0"
                >
                  <img
                    src={`${API_URL}/${reply.user?.avatar || "images/avatar/avatar-default.png"}`}
                    alt={reply.user?.name || "Người dùng"}
                    className="w-10 h-10 rounded-full border-2 object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{reply.user?.name || "Người dùng"}</span>
                      {reply.user?.isAdmin && (
                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded flex items-center gap-1">
                          <Shield size={10} /> Admin
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{reply.comment}</p>
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

export default function ProductReviewSection({ product }: any) {
  const { accessToken } = useUserToken();
  const user = useUserInfo();
  const isLogged = Boolean(accessToken);
  const isAdmin = user?.role === "admin";
  const userId = user?.id || "";

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allReviews, setAllReviews] = useState<any[]>(product.reviews || []);

  const avgRating = allReviews.length
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : "0";
  const counts = [5, 4, 3, 2, 1].map((s) => ({
    s,
    c: allReviews.filter((r) => r.rating === s).length,
  }));
  const labels = ["", "Rất tệ 😞", "Tệ 😕", "Bình thường 😐", "Tốt 😊", "Tuyệt vời 🤩"];

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return toast.error("Chọn số sao!");
    if (!comment.trim()) return toast.error("Nhập nội dung!");
    setLoading(true);

    try {
      const payload = { rating, comment, images };
      const res = await productService.addReview(product.id, payload);

      if (res?.data?.reviews && Array.isArray(res.data.reviews)) {
        setAllReviews((prev) =>
          (res.data.reviews as any[]).map((r) => {
            const oldReview = prev.find((pr) => pr._id === r._id);
            return {
              ...r,
              replies: r.replies.map((reply: any) => {
                const oldReply = oldReview?.replies?.find((or: any) => or._id === reply._id);
                return oldReply
                  ? { ...oldReply, ...reply, user: oldReply.user || reply.user }
                  : reply;
              }),
            };
          })
        );
      } else {
        toast.error("API không trả reviews trong response");
        return;
      }

      toast.success("Đã gửi review!");
      setRating(0);
      setComment("");
      setImages([]);
      setImageInput("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Gửi thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const addReply = async (reviewId: string, text: string) => {
    if (!text.trim()) return;

    try {
      const res = await productService.replyToReview(product.id, reviewId, { comment: text });

      setAllReviews((prev) =>
        (res.data.reviews as any[]).map((r) => {
          const oldReview = prev.find((pr) => pr._id === r._id);
          return {
            ...r,
            replies: r.replies.map((reply: any) => {
              const oldReply = oldReview?.replies?.find((or: any) => or._id === reply._id);
              return oldReply
                ? { ...oldReply, ...reply, user: oldReply.user || reply.user }
                : reply;
            }),
          };
        })
      );

      toast.success("Đã phản hồi!");
    } catch (err) {
      toast.error("Reply thất bại!");
    }
  };

  return (
    <div className="space-y-5">
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
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: allReviews.length ? `${(c / allReviews.length) * 100}%` : 0 }}
                />
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
              <Stars value={rating} size={28} interactive onRate={setRating} />
              <span className="text-sm text-muted-foreground">{labels[rating]}</span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium">Nội dung *</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Chia sẻ về ${product.name}...`}
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Image URLs */}
          <div>
            <label className="text-sm font-medium">Hình ảnh (URL)</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} className="w-16 h-16 object-cover rounded border" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, j) => j !== i))}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <X size={12} className="mx-auto cursor-pointer" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <div className="flex gap-2 w-full">
                  <Input
                    type="text"
                    placeholder="Nhập URL ảnh..."
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (imageInput.trim()) {
                        setImages([...images, imageInput.trim()]);
                        setImageInput("");
                      }
                    }}
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    className="shrink-0"
                  />
                </div>
              )}
            </div>
          </div>

          <Button type="primary" htmlType="submit" size="large" icon={<Send size={16} />} loading={loading}>
            Gửi
          </Button>
        </form>
      ) : (
        <div className="rounded-xl p-6 border text-center">
          <LogIn size={40} className="mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-semibold mb-1">Đăng nhập để đánh giá</h3>
          <p className="text-sm text-muted-foreground mb-3">Chia sẻ trải nghiệm của bạn</p>
          <Link to="/login">
            <Button type="primary" icon={<LogIn size={16} />}>
              Đăng nhập
            </Button>
          </Link>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-3">
        <h3 className="font-semibold">Tất cả đánh giá ({allReviews.length})</h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {allReviews.length === 0 ? (
            <div className="text-center border border-primary/40 rounded-lg p-3">
              <div className="text-4xl">📝</div>
              <p className="text-lg text-foreground font-semibold">Chưa có đánh giá nào</p>
              <p className="text-sm text-muted-foreground">
                Sản phẩm này chưa có đánh giá. Hãy là người đầu tiên để lại phản hồi!
              </p>
            </div>
          ) : (
            allReviews.map((r) => (
              <ReviewCard key={r._id} review={r} canReply={isAdmin} onReply={addReply} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
