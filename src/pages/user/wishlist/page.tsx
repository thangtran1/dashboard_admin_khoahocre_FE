import NoAccess from "@/components/user/NoAccess";
import WishListProducts from "@/components/user/WishListProducts";
import { getFakeUser } from "@/constants/fakeData";
const WishListPage = async () => {
  const user = await getFakeUser(1);
  const userData = user[0] as any;
  return (
    <>
      {userData?.id ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
