/// <reference types="vite/client" />

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "owl.carousel";

interface OwlCarouselOptions {
  items?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayTimeout?: number;
  autoplayHoverPause?: boolean;
  nav?: boolean;
  navText?: string[];
  dots?: boolean;
  animateOut?: string;
  animateIn?: string;
  smartSpeed?: number;
  [key: string]: any;
}

declare global {
  interface JQuery {
    owlCarousel(options?: OwlCarouselOptions): JQuery;
  }
}
