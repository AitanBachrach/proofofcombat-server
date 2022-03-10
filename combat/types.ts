import {
  Hero,
  MonsterInstance,
  Monster,
  CombatEntry,
  AttackType,
  HeroStats,
  InventoryItemType,
  EnchantmentType,
  HeroClasses,
} from "types/graphql";

export type Attribute = keyof HeroStats;

export type Combatant = {
  level: number;
  name: string;
  attackType: AttackType;
  class: HeroClasses;
  equipment: CombatantGear;
  attributes: HeroStats;
  damageReduction: number;
  luck: {
    smallModifier: number;
    largeModifier: number;
    ultraModifier: number;
  };
};

export type EnchantedCombatant = Combatant & {
  percentageDamageIncrease: number;
  percentageDamageReduction: number;
  enchanted: true;
  bonusAccuracy: number;
  bonusDodge: number;
  bonusWeaponTiers: number;
  bonusArmorTiers: number;
  // inverse for MATHS
  mesmerizeChance: number;
  focusChance: number;
};

export type AttackAttributes = {
  toHit: Attribute;
  damage: Attribute;
  dodge: Attribute;
  damageReduction: Attribute;
};

export type CombatResult = {
  victimDamage: number;
  attackerDamage: number;
  victimEnchantmentDamage: number;
  attackerEnchantmentDamage: number;
  victimHeal: number;
  attackerHeal: number;

  victimDied: boolean;
  attackerDied: boolean;
  log: CombatEntry[];
};

export type CombatGear = {
  type?: InventoryItemType;
  level: number;
  baseItem?: string;
  enchantment?: EnchantmentType | null;
};

export type QuestItem = {
  name: string;
  baseItem: string;
};

export type CombatantGear = {
  armor: CombatGear[];
  weapons: CombatGear[];
  quests: QuestItem[];
};
