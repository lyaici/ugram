export default {
  methods: {
    handleModal(modal: boolean): boolean {
      const newModal: boolean = !modal;
      return newModal;
    },
    switchScroll() {
      const element: HTMLElement = document.body as HTMLElement;
      if (element.style.overflow !== 'hidden') element.style.overflow = 'hidden';
      else element.style.removeProperty('overflow');
    },
  },
};
