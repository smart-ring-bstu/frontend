import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type FilterCategory = 'all' | 'him' | 'her';

interface RingProduct {
  id: string;
  name: string;
  audienceLabel: string;
  categories: ('him' | 'her')[];
  price: string;
  gradientId: string;
  gradientStops: [string, string];
}

const PRODUCTS: RingProduct[] = [
  {
    id: 'signature-gradient',
    name: 'Фирменный\nградиент',
    audienceLabel: 'Для него и для неё',
    categories: ['him', 'her'],
    price: '19 900 ₽',
    gradientId: 'grad-signature',
    gradientStops: ['#6B2CF5', '#0D70F2'],
  },
  {
    id: 'rose-gold',
    name: 'Розовое золото',
    audienceLabel: 'Для неё',
    categories: ['her'],
    price: '19 900 ₽',
    gradientId: 'grad-rose',
    gradientStops: ['#D88C99', '#F2D0AA'],
  },
  {
    id: 'sage',
    name: 'Шалфей',
    audienceLabel: 'Для него',
    categories: ['him'],
    price: '19 900 ₽',
    gradientId: 'grad-sage',
    gradientStops: ['#99C1B9', '#CFE5DF'],
  },
  {
    id: 'sand',
    name: 'Песок',
    audienceLabel: 'Для него и для неё',
    categories: ['him', 'her'],
    price: '19 900 ₽',
    gradientId: 'grad-sand',
    gradientStops: ['#E2C29D', '#F1E3D3'],
  },
];

export const Catalog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.categories.includes(activeFilter);
  });

  return (
    /* Frame: White Parchment (#F1E3D3), gap: 64px, padding-bottom: 56px */
    <div className="min-h-screen w-full bg-[#F1E3D3] flex flex-col items-center pb-[56px] gap-[64px] font-['Manrope'] text-[#0E1054]">
      
      {/* Header: background #99C1B9, height 296px */}
      <header className="w-full min-h-[296px] bg-[#99C1B9] flex flex-col items-center">
        {/* Container: width 1120px, padding 0 24px */}
        <div className="w-full max-w-[1120px] px-[24px] flex flex-col">
          
          {/* Nav: height 98px */}
          <nav className="w-full min-h-[98px] flex flex-wrap items-center justify-between gap-4 py-4">
            {/* Link - Brand, на главную */}
            <Link to="/" className="flex items-center gap-[10px] h-[50px]">
              {/* Component 1 (Логотип 50x50, border-radius 20px) */}
              <div className="w-[50px] h-[50px] rounded-[20px] flex items-center justify-center relative">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                  <defs>
                    <linearGradient id="brand-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#99C1B9" />
                      <stop offset="50%" stopColor="#D88C99" />
                      <stop offset="100%" stopColor="#F2D0AA" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="25"
                    cy="25"
                    r="17"
                    stroke="url(#brand-logo-grad)"
                    strokeWidth="4"
                  />
                  <path
                    d="M21 28L22.5 24.5L26 23L22.5 21.5L21 18L19.5 21.5L16 23L19.5 24.5L21 28Z"
                    fill="#F1E3D3"
                  />
                </svg>
              </div>
              <span className="font-['Unbounded'] font-semibold text-[32px] leading-[40px] text-[#F1E3D3]">
                AURING
              </span>
            </Link>

            {/* Навигационные ссылки (Manrope 24px, #F1E3D3) */}
            <ul className="flex flex-wrap items-center gap-[36px] font-['Manrope'] font-normal text-[24px] leading-[24px] text-[#F1E3D3]">
              <li>
                <Link to="/catalog" className="opacity-80 hover:opacity-100 transition-opacity py-[4px]">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="#app" className="opacity-80 hover:opacity-100 transition-opacity py-[4px]">
                  Приложение
                </Link>
              </li>
              <li>
                <Link to="#blog" className="opacity-80 hover:opacity-100 transition-opacity py-[4px]">
                  Блог
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:opacity-80 transition-opacity py-[4px]">
                  О компании
                </Link>
              </li>
            </ul>

            {/* Кнопки справа: gap 10px, height 42px */}
            <div className="flex items-center gap-[10px] h-[42px]">
              <Link
                to="#login"
                className="box-border flex items-center justify-center px-[20px] py-[10px] h-[42px] border border-[#F1E3D3] rounded-[999px] font-['Manrope'] font-bold text-[15px] leading-[20px] text-[#F1E3D3] hover:bg-[#F1E3D3]/10 transition-colors"
              >Войти
              </Link>
              <Link
                to="#cart"
                className="flex items-center justify-center px-[20px] py-[10px] h-[42px] rounded-[999px] bg-gradient-to-r from-[#D88C99] to-[#F2D0AA] font-['Manrope'] font-bold text-[15px] leading-[20px] text-white hover:opacity-95 transition-opacity"
              >
                Корзина (1)
              </Link>
            </div>
          </nav>

          {/* Header Heading Container: padding 32px 0 64px, gap 14px */}
          <div className="flex flex-col items-start pt-[32px] pb-[64px] gap-[14px] w-full">
            <h1 className="font-['Unbounded'] font-medium text-[52px] leading-[60px] text-[#F1E3D3]">
              Каталог
            </h1>
            <p className="font-['Manrope'] font-normal text-[17px] leading-[27px] text-[#0E1054] max-w-[560px]">
              Четыре цвета одной модели. Выберите отделку и размер.
            </p>
          </div>

        </div>
      </header>

      {/* Main -> Section: width 1120px, padding 0 24px, gap 32px */}
      <main className="w-full max-w-[1120px] px-[24px] flex flex-col items-start gap-[32px]">
        
        {/* Group - Фильтр: gap 10px, height 42px */}
        <div
          role="group"
          aria-label="Фильтр"
          className="flex flex-row flex-wrap items-start gap-[10px] w-full min-h-[42px]"
        >
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`box-border flex items-center justify-center px-[20px] py-[10px] h-[42px] rounded-[999px] font-['Manrope'] font-bold text-[15px] leading-[20px] transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#0E1054] border border-[#0E1054] text-[#F1E3D3]'
                : 'bg-transparent border border-[#0E1054]/16 text-[#0E1054] hover:border-[#0E1054]/40'
            }`}
          >
            Все
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('him')}
            className={`box-border flex items-center justify-center px-[20px] py-[10px] h-[42px] rounded-[999px] font-['Manrope'] font-bold text-[15px] leading-[20px] transition-colors cursor-pointer ${
              activeFilter === 'him'
                ? 'bg-[#0E1054] border border-[#0E1054] text-[#F1E3D3]'
                : 'bg-transparent border border-[#0E1054]/16 text-[#0E1054] hover:border-[#0E1054]/40'
            }`}
          >
            Для него
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('her')}
            className={`box-border flex items-center justify-center px-[20px] py-[10px] h-[42px] rounded-[999px] font-['Manrope'] font-bold text-[15px] leading-[20px] transition-colors cursor-pointer ${
              activeFilter === 'her'
                ? 'bg-[#0E1054] border border-[#0E1054] text-[#F1E3D3]'
                : 'bg-transparent border border-[#0E1054]/16 text-[#0E1054] hover:border-[#0E1054]/40'
            }`}
          >
            Для неё
          </button>
        </div>

        {/* Cards Container: gap 20px, width 1072px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] w-full">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`#${product.id}`}
              className="flex flex-col items-start pt-[20px] px-[20px] pb-[24px] gap-[3px] w-full min-h-[372.54px] bg-[#FBF4EC] rounded-[28px] transition-transform hover:-translate-y-1"
            >
              {/* Background: 213x213px, padding 31.5px 0, bg #0E1054, border-radius 20px */}
              <div className="w-full aspect-square max-h-[213px] py-[31.5px] bg-[#0E1054] rounded-[20px] flex flex-col items-center justify-center">
                {/* Component 1: 150x150px (внешний вектор 17%, внутренний 23.5% с обводкой 1.5px rgba(0,0,0,0.2)) */}
                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 150 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id={product.gradientId}
                      x1="0%"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                    >
                      <stop offset="0%" stopColor={product.gradientStops[0]} />
                      <stop offset="100%" stopColor={product.gradientStops[1]} />
                    </linearGradient>
                  </defs>
                  {/* Основное кольцо */}
                  <circle
                    cx="75"
                    cy="75"
                    r="44.625"
                    stroke={`url(#${product.gradientId})`}
                    strokeWidth="9.75"
                  />
                  {/* Внутренняя тонкая граница: Black 20%, 1.5px */}
                  <circle
                    cx="75"
                    cy="75"
                    r="39.75"
                    stroke="rgba(0, 0, 0, 0.2)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Heading 3: padding-top 13px, Unbounded 500, 17px, line-height 20px */}
              <div className="pt-[13px] w-full">
                <h3 className="font-['Unbounded'] font-medium text-[17px] leading-[20px] text-[#0E1054] whitespace-pre-line">
                  {product.name}
                </h3>
              </div>

              {/* Подзаголовок категории: Manrope 400, 14px, line-height 22px, color #5A5C86 */}
              <div className="w-full h-[23px] flex items-center">
                <span className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#5A5C86]">
                  {product.audienceLabel}
                </span>
              </div>

              {/* Цена: padding-top 9px, Unbounded 500, 18px, line-height 22px, color #0E1054 */}
              <div className="pt-[9px] w-full h-[31px] flex items-center">
                <span className="font-['Unbounded'] font-medium text-[18px] leading-[22px] text-[#0E1054]">
                  {product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </main>

      {/* Footer: width 1120px, padding 64.01px 24px 0px */}
      <footer className="w-full max-w-[1120px] px-[24px] pt-[64px] flex flex-row flex-wrap items-center justify-between gap-4 font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#5A5C86]">
        <span>© 2026 AURING</span>
        <div className="flex items-center gap-1.5">
          <Link to="#privacy" className="hover:underline">
            Политика конфиденциальности
          </Link>
          <span>·</span>
          <Link to="#returns" className="hover:underline">
            Условия возврата
          </Link>
        </div>
      </footer>

    </div>
  );
};

export default Catalog;