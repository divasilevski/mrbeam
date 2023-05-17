<template>
  <div class="flex flex-row justify-between">
    <article class="prose prose-slate" v-html="html"></article>
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it'

useHead({
  title: 'MrBeam | Docs',
})

const md = new MarkdownIt()

const html = md.render(
  `
  # docs
  
  ## What is a Beam?

  A beam, in Structural Engineering terms, is a member that can be comprised of a number of materials (including steel and wood aluminum) to withstand loads – typically applied laterally to the beam axis. Beams can also be referred to as members, elements, rafters, shafts, or purlins.

  ## Calculating Shear Force Diagrams

  In this tutorial, we will look at calculating the shear force diagram of a simple beam. This is an important concept to understand, as shear force is something a beam will need to be checked for, for a safe design.

  ## What is a Beam?

  A beam, in Structural Engineering terms, is a member that can be comprised of a number of materials (including steel and wood aluminum) to withstand loads – typically applied laterally to the beam axis. Beams can also be referred to as members, elements, rafters, shafts, or purlins.

  ## Calculating Shear Force Diagrams

  In this tutorial, we will look at calculating the shear force diagram of a simple beam. This is an important concept to understand, as shear force is something a beam will need to be checked for, for a safe design.

  ## What is a Beam?

  A beam, in Structural Engineering terms, is a member that can be comprised of a number of materials (including steel and wood aluminum) to withstand loads – typically applied laterally to the beam axis. Beams can also be referred to as members, elements, rafters, shafts, or purlins.

  ## Calculating Shear Force Diagrams

  In this tutorial, we will look at calculating the shear force diagram of a simple beam. This is an important concept to understand, as shear force is something a beam will need to be checked for, for a safe design.

  ## What is a Beam?

  A beam, in Structural Engineering terms, is a member that can be comprised of a number of materials (including steel and wood aluminum) to withstand loads – typically applied laterally to the beam axis. Beams can also be referred to as members, elements, rafters, shafts, or purlins.

  ## Calculating Shear Force Diagrams

  In this tutorial, we will look at calculating the shear force diagram of a simple beam. This is an important concept to understand, as shear force is something a beam will need to be checked for, for a safe design.

  ## What is a Beam?

  A beam, in Structural Engineering terms, is a member that can be comprised of a number of materials (including steel and wood aluminum) to withstand loads – typically applied laterally to the beam axis. Beams can also be referred to as members, elements, rafters, shafts, or purlins.

  ## Calculating Shear Force Diagrams

  In this tutorial, we will look at calculating the shear force diagram of a simple beam. This is an important concept to understand, as shear force is something a beam will need to be checked for, for a safe design.`
)
</script>
