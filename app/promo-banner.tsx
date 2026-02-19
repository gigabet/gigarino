interface PromoBannerProps {
  title: string
  ctaText: string
}

export default function PromoBanner({ title, ctaText }: PromoBannerProps) {
  return (
    <div className='relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-linear-to-r from-gray-800 via-gray-700 to-gray-800'>
        {/* Decorative Elements */}
        <div className='absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gray-600/20 blur-2xl' />
        <div className='absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gray-900/30 blur-2xl' />
      </div>

      {/* Content */}
      <div className='relative flex items-center justify-between p-6'>
        <div className='flex items-center gap-4'>
          {/* Icon Placeholder */}
          <div className='h-12 w-12 shrink-0 rounded-lg bg-gray-600/40' />

          {/* Text */}
          <h3 className='text-lg font-semibold text-gray-200 sm:text-xl'>{title}</h3>
        </div>

        {/* CTA Button */}
        <button
          type='button'
          className='shrink-0 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-500'
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
}
