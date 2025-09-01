import { Component } from '@angular/core';


interface StatItem {
  label: string;
  value: string;
}

interface LinkItem {
  text: string;
  href: string;
}

@Component({
  selector: 'app-work-with-us',
  standalone: true,
  imports: [],
  templateUrl: './work-with-us.component.html'
})
export class WorkWithUsComponent {
  backgroundClipPath = "clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";

  title = 'Work with us';
  description = 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.';

  links: LinkItem[] = [
    { text: 'Open roles', href: '#' },
    { text: 'Internship program', href: '#' },
    { text: 'Our values', href: '#' },
    { text: 'Meet our leadership', href: '#' }
  ];

  stats: StatItem[] = [
    { label: 'Offices worldwide', value: '12' },
    { label: 'Full-time colleagues', value: '300+' },
    { label: 'Hours per week', value: '40' },
    { label: 'Paid time off', value: 'Unlimited' }
  ];
}
