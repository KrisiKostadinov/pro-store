import { Prisma } from '@prisma/client';

export const sampleProductsData: Prisma.ProductCreateInput[] = [
  {
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    shortDescription: 'Comfortable over-ear wireless headphones with noise cancellation.',
    longDescription: 'Experience high-fidelity sound and long-lasting comfort with our wireless Bluetooth headphones. Features active noise cancellation and 20 hours of battery life.',
    originalPrice: new Prisma.Decimal(199.99),
    salePrice: new Prisma.Decimal(149.99),
    images: JSON.stringify([
      'https://example.com/images/headphones-1.jpg',
      'https://example.com/images/headphones-2.jpg'
    ]),
    stock: 25,
    params: JSON.stringify([
      { key: 'Color', value: 'Black' },
      { key: 'Battery Life', value: '20 hours' },
      { key: 'Connectivity', value: 'Bluetooth 5.0' }
    ])
  },
  {
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    shortDescription: 'Comfortable and adjustable office chair for long working hours.',
    longDescription: 'Designed to support your posture and reduce back pain, this ergonomic office chair features adjustable height, lumbar support, and breathable mesh.',
    originalPrice: new Prisma.Decimal(299.00),
    salePrice: new Prisma.Decimal(249.00),
    images: JSON.stringify([
      'https://example.com/images/chair-1.jpg',
      'https://example.com/images/chair-2.jpg'
    ]),
    stock: 15,
    params: JSON.stringify([
      { key: 'Material', value: 'Mesh & Foam' },
      { key: 'Color', value: 'Gray' },
      { key: 'Weight Capacity', value: '120kg' }
    ])
  },
  {
    name: '4K Ultra HD Smart TV',
    slug: '4k-ultra-hd-smart-tv',
    shortDescription: '55-inch 4K Ultra HD Smart TV with HDR and voice control.',
    longDescription: 'Enjoy stunning 4K resolution and access to all your favorite streaming services with this Smart TV. Includes HDR support, voice control, and multiple HDMI inputs.',
    originalPrice: new Prisma.Decimal(799.99),
    salePrice: new Prisma.Decimal(699.99),
    images: JSON.stringify([
      'https://example.com/images/tv-1.jpg'
    ]),
    stock: 10,
    params: JSON.stringify([
      { key: 'Screen Size', value: '55 inches' },
      { key: 'Resolution', value: '4K Ultra HD' },
      { key: 'Smart Features', value: 'Yes' }
    ])
  },
  {
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    shortDescription: 'Reusable insulated water bottle that keeps drinks cold for 24 hours.',
    longDescription: 'Eco-friendly stainless steel water bottle with double-wall insulation. Perfect for keeping your drinks cold or hot for hours.',
    originalPrice: new Prisma.Decimal(25.00),
    salePrice: null,
    images: JSON.stringify([
      'https://example.com/images/bottle-1.jpg'
    ]),
    stock: 50,
    params: JSON.stringify([
      { key: 'Capacity', value: '750ml' },
      { key: 'Color', value: 'Silver' },
      { key: 'Insulated', value: 'Yes' }
    ])
  },
  {
    name: 'Gaming Laptop',
    slug: 'gaming-laptop',
    shortDescription: 'High-performance gaming laptop with NVIDIA graphics.',
    longDescription: 'This gaming laptop comes equipped with the latest NVIDIA GeForce RTX graphics, a high refresh rate display, and a powerful Intel i7 processor for smooth gaming.',
    originalPrice: new Prisma.Decimal(1599.00),
    salePrice: new Prisma.Decimal(1399.00),
    images: JSON.stringify([
      'https://example.com/images/laptop-1.jpg',
      'https://example.com/images/laptop-2.jpg'
    ]),
    stock: 8,
    params: JSON.stringify([
      { key: 'Processor', value: 'Intel Core i7' },
      { key: 'Graphics Card', value: 'NVIDIA GeForce RTX 3060' },
      { key: 'RAM', value: '16GB' },
      { key: 'Storage', value: '1TB SSD' }
    ])
  }
];
