import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    return () => {
      router.push("/admin/login");
    };
  }, [router]);
  return;
}
