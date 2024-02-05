import Link from "next/link";

interface PaginnationProps {
  total: number;
  page: string;
}

export default function Paginnation({ total, page }: PaginnationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap">
      {total <= 10 ? (
        [...Array(total)].map((_, index) => (
          <Link
            href={{ pathname: "/stores", query: { page: index + 1 } }}
            key={index}
          >
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                index + 1 === parseInt(page, 10)
                  ? "text-bule-600 font-bold"
                  : "text-gray-300"
              }`}
            >
              {index + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {parseInt(page) > 1 && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: parseInt(page) - 1 },
              }}
            >
              <span
                className={`px-3 py-2 rounded border shadow-sm bg-white 
            `}
              >
                이전
              </span>
            </Link>
          )}
          <Link href={{ pathname: "/stores", query: { page: parseInt(page) } }}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white 
            `}
            >
              {page}
            </span>
          </Link>
          {total > parseInt(page) && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: parseInt(page) + 1 },
              }}
            >
              <span
                className={`px-3 py-2 rounded border shadow-sm bg-white 
            `}
              >
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
