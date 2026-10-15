export default function LionBackground() {
  return (
    <div className="lion-bg" aria-hidden="true">
      <picture>
        <source srcSet="/images/lion-bg.webp" type="image/webp" />
        <img
          src="/images/lion-bg.png"
          alt=""
          className="lion-bg__image"
          width={2560}
          height={1440}
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div className="lion-bg__overlay" />
    </div>
  );
}
