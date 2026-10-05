import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FadeIn } from './FadeIn';
import { supabase } from '@/lib/supabase';

const rsvpSchema = z.object({
  fullName: z.string().min(2, 'من فضلك اكتب الاسم بالكامل'),
  guestCount: z.coerce.number().min(1, 'لازم شخص واحد على الأقل').max(20, 'الحد الأقصى 20 شخص'),
  attendance: z.enum(['attending', 'unable'], {
    required_error: 'من فضلك حدد هل هتحضر',
  }),
  contact: z.string().optional(),
  message: z.string().max(500).optional(),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export function RsvpForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedAttending, setSubmittedAttending] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { fullName: '', guestCount: 1, contact: '', message: '' },
  });

  const onSubmit = async (data: RsvpFormValues) => {
    setStatus('submitting');
    const { error } = await supabase.from('rsvps').insert({
      full_name: data.fullName,
      guest_count: data.guestCount,
      attendance: data.attendance,
      contact: data.contact || null,
      message: data.message || null,
    });

    if (error) {
      console.error('RSVP submit failed', error);
      setStatus('error');
      return;
    }

    setSubmittedName(data.fullName);
    setSubmittedAttending(data.attendance === 'attending');
    setStatus('success');
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 px-6 bg-ink relative">
      <FadeIn className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-display italic text-gold-dim tracking-[0.3em] text-xs uppercase">RSVP</span>
          <h2 className="font-arabic gold-text text-4xl md:text-5xl mt-3">تأكيد الحضور</h2>
        </div>

        {status === 'success' ? (
          <div className="border border-gold-dim/40 bg-panel p-12 text-center shadow-lg">
            <span className="text-gold text-3xl mb-6 block">✦</span>
            <p className="font-display italic text-2xl text-cream leading-relaxed">
              {submittedAttending
                ? `يسعدنا حضورك يا ${submittedName}! نتقابل يوم 4 أبريل 2027.`
                : `هتوحشنا يا ${submittedName} — شكرًا إنك خبرتنا.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-panel border border-gold-dim/20 p-8 md:p-12 shadow-lg">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gold-dim mb-2">الاسم بالكامل</label>
              <input
                {...register('fullName')}
                placeholder="اسمك هنا"
                className="w-full bg-transparent border-0 border-b border-gold-dim/40 focus:border-gold focus:outline-none px-0 py-2 text-cream placeholder:text-cream-dim/40"
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-dim mb-2">عدد الأفراد</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  {...register('guestCount')}
                  className="w-full bg-transparent border-0 border-b border-gold-dim/40 focus:border-gold focus:outline-none px-0 py-2 text-cream"
                />
                {errors.guestCount && <p className="text-xs text-red-400 mt-1">{errors.guestCount.message}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-dim mb-2">رقم أو إيميل (اختياري)</label>
                <input
                  {...register('contact')}
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-transparent border-0 border-b border-gold-dim/40 focus:border-gold focus:outline-none px-0 py-2 text-cream placeholder:text-cream-dim/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold-dim mb-3">هل هتحضر؟</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" value="attending" {...register('attendance')} className="accent-[#cfa968]" />
                  <span className="font-display text-lg">أكيد، هكون موجود/ة</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" value="unable" {...register('attendance')} className="accent-[#cfa968]" />
                  <span className="font-display text-lg">للأسف مش هقدر أحضر</span>
                </label>
              </div>
              {errors.attendance && <p className="text-xs text-red-400 mt-1">{errors.attendance.message}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gold-dim mb-2">رسالة للعروسين (اختياري)</label>
              <textarea
                {...register('message')}
                rows={3}
                placeholder="اكتب رسالتك هنا..."
                className="w-full bg-transparent border border-gold-dim/40 focus:border-gold focus:outline-none px-3 py-2 text-cream placeholder:text-cream-dim/40 resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-400 text-center">حصل خطأ أثناء الإرسال، من فضلك حاول تاني.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full h-14 bg-gold hover:bg-gold-bright text-ink font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 disabled:opacity-60"
            >
              {status === 'submitting' ? 'جاري الإرسال...' : 'إرسال التأكيد'}
            </button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
