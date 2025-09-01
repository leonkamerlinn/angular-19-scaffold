import { Component, signal } from '@angular/core';


interface NavigationItem {
  text: string;
  href: string;
}

interface Category {
  name: string;
  items: NavigationItem[];
}

interface MegaMenuItem {
  image: {
    src: string;
    alt: string;
  };
  title: string;
}

@Component({
  selector: 'app-store-navigation',
  standalone: true,
  imports: [],
  templateUrl: './store-navigation.component.html'
})
export class StoreNavigationComponent {
  isMobileMenuOpen = signal(false);
  selectedTab = signal('women');

  megaMenuItems: MegaMenuItem[] = [
    {
      image: {
        src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
        alt: 'Models sitting back to back, wearing Basic Tee in black and bone.'
      },
      title: 'New Arrivals'
    },
    {
      image: {
        src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
        alt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
      },
      title: 'Basic Tees'
    }
  ];

  categories: Category[] = [
    {
      name: 'Clothing',
      items: [
        { text: 'Tops', href: '#' },
        { text: 'Dresses', href: '#' },
        { text: 'Pants', href: '#' },
        { text: 'Denim', href: '#' },
        { text: 'Sweaters', href: '#' },
        { text: 'T-Shirts', href: '#' },
        { text: 'Jackets', href: '#' },
        { text: 'Activewear', href: '#' },
        { text: 'Browse All', href: '#' }
      ]
    },
    {
      name: 'Accessories',
      items: [
        { text: 'Watches', href: '#' },
        { text: 'Wallets', href: '#' },
        { text: 'Bags', href: '#' },
        { text: 'Sunglasses', href: '#' },
        { text: 'Hats', href: '#' },
        { text: 'Belts', href: '#' }
      ]
    },
    {
      name: 'Brands',
      items: [
        { text: 'Re-Arranged', href: '#' },
        { text: 'Counterfeit', href: '#' },
        { text: 'Full Nelson', href: '#' },
        { text: 'My Way', href: '#' }
      ]
    }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  selectTab(tab: string) {
    this.selectedTab.set(tab);
  }
} 