import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/animate-ui/components/radix/accordion';

// Replaced content with Happy Book specific FAQs based on context.
const ITEMS = [
  {
    title: 'How does Happy Book help with last-minute studying?',
    content:
      'Happy Book uses AI to instantly summarize chapters, answer specific questions from your syllabus, and generate quick study guides when you are short on time.',
  },
  {
    title: 'Is it really free?',
    content:
      'Yes, the core features of Happy Book are currently free for students aiming to conquer their coursework without financial stress.',
  },
  {
    title: 'Can it read my syllabus?',
    content:
      'Absolutely! You can paste in your reading materials or syllabus topics, and Happy Book will start tutoring you on exactly what you need to know.',
  },
];

type RadixAccordionDemoProps = {
  multiple?: boolean;
  collapsible?: boolean;
  keepRendered?: boolean;
  showArrow?: boolean;
};

export const RadixAccordionDemo = ({
  multiple = false,
  collapsible = true,
  keepRendered = false,
  showArrow = true,
}: RadixAccordionDemoProps) => {
  return (
    <Accordion
      type={multiple ? 'multiple' : 'single'}
      collapsible={collapsible}
      className="max-w-[800px] w-full mx-auto"
    >
      {ITEMS.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger showArrow={showArrow}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent keepRendered={keepRendered}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
