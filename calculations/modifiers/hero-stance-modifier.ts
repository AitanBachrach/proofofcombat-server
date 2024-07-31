import { HeroClasses, AttackType, HeroStance } from "types/graphql";

import { Modifier, ModifierOptions } from "./modifier";

import { attributesForAttack } from "../../combat/constants";
import type { Hero } from "../units/hero";

export class HeroStanceModifier extends Modifier<undefined> {
  parent: Hero;

  constructor(options: ModifierOptions<undefined>) {
    super(options);

    this.parent = options.parent as Hero;
  }

  getBonus(prop: string): number | void {}
  getMultiplier(prop: string): number | void {
    const victimAttributes = attributesForAttack(
      this.parent.opponent?.attackType ?? this.parent.attackType,
    );
    const attackAttributes = attributesForAttack(this.parent.attackType);
    const { activeStance } = this.parent.hero;

    switch (activeStance) {
      case HeroStance.Normal:
        break;
      case HeroStance.Combat:
        break;
      case HeroStance.Reckless:
        if (prop === "bonusAccuracy") {
          return 2;
        }
        if (prop === "bonusDodge") {
          return 0.5;
        }
        break;

      ///@TODO the rest
      case HeroStance.Aggressive:
        break;
      case HeroStance.Defensive:
        break;
      case HeroStance.NecroticBeam:
        break;
      case HeroStance.CloudofKnives:
        break;
      case HeroStance.FrozenOrb:
        break;
      case HeroStance.MageArmor:
        break;
      case HeroStance.NormalArrow:
        break;
      case HeroStance.BarbedArrow:
        break;
      case HeroStance.BloodHunter:
        break;
      case HeroStance.DarkPresence:
        break;
      case HeroStance.AuraoftheLifeless:
        break;
      case HeroStance.ShieldSmash:
        break;
      case HeroStance.ShieldSlash:
        break;
      case HeroStance.HolySmite:
        break;
      case HeroStance.VengefulSmite:
        break;
      case HeroStance.WarriorsStance:
        break;
      case HeroStance.Hexblade:
        break;
      case HeroStance.Focus:
        break;
    }
  }
  getExtraBonus(prop: string): number | void {}
}
