import { Storefront } from "../storefront";

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params; const path = slug.join("/");
  let route = slug[0]; let postSlug: string | undefined;
  if (route === "products") { postSlug=slug[1]; route = "product"; }
  else if (route === "track-order") route = "track";
  else if (route === "blog" && slug[1]) { postSlug=slug[1]; route="blog"; }
  const allowed=["shop","product","cart","search","about","contact","track","faq","shipping","returns","privacy","terms","blog"];
  if(!allowed.includes(route)) route="404";
  return <Storefront route={route} slug={postSlug || path} />;
}
