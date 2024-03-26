import {
  type BonusMaterial,
  type BonusMaterials
} from '../../entities/apiTypes';

export interface SidebarBonusMaterials {
  title: string;
  path: string;
  links: [BonusMaterial];
}

export const getBonusLinks = (
  data: BonusMaterials
): SidebarBonusMaterials[] => {
  return [
    {
      title: 'Webinars',
      path: '/webinars',
      links: data.webinars
    },
    {
      title: 'Routinen',
      path: '/routines',
      links: data.routines
    },
    {
      title: 'Körperpraktiken',
      path: '/bodyPractices',
      links: data.bodyPractices
    },
    {
      title: 'Guasha Massagen',
      path: '/guasha-massage',
      links: data.guasha
    },
    {
      title: 'Taping Techniken',
      path: '/taping',
      links: data.taping
    },
    {
      title: 'Kurze Gesichtstechniken',
      path: '/facial',
      links: data.facial
    },
    {
      title: 'Augengym',
      path: '/augengym',
      links: data.augengym
    },
    {
      title: 'Übungen für den Hals',
      path: '/neckExercises',
      links: data.neckExercises
    },
    {
      title: 'Gast - Experten',
      path: '/guest-record',
      links: data.gast
    }
  ];
};
