import { useRouter } from "next/router";

export default function StorePage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>dsf</h1>
    </div>
  );
}
