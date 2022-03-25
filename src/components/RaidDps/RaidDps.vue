<template>
  <div class="raid-dps">
    <EncounterData />
    <CombatantData
        v-for="combatant in combatants"
        :key="combatant['name']"
        v-bind="combatant"
        class="combatant"
    />
    <RaidData />
  </div>
</template>

<script>
import EncounterData from "./EncounterData.vue"
import CombatantData from "./CombatantData.vue"
import RaidData from "./RaidData.vue"
import { mapState } from "vuex"

export default {
  name: "RaidDps",

  components: {
    EncounterData,
    CombatantData,
    RaidData,
  },

  computed: {
    ...mapState("data", [ "combatants" ]),
  },
}
</script>

<style lang="scss" scoped>
.raid-dps {
  & > * {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .combatant:not(:last-of-type) {
    border-bottom: solid 1px rgba(0, 0, 0, 0.8);
  }
}
</style>
