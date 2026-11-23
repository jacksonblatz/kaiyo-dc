import {
  BackToTop,
  BulletList,
  Callout,
  Diagram,
  Divider,
  Floating,
  Image,
  LinkCards,
  Page,
  Properties,
  Rows,
  Section,
  Table,
  TableOfContents,
  Text,
} from "./article-ui";

export default function KaiyoDC() {
  return (
    <Page
      title="Kaiyō DC"
      summary="A thought-experiment for a modular ring-shaped floating energy island off Japan, with three layout options. The drawings follow Layout C: a walkable solar-tiled roof, a donut-shaped biosphere around an open lagoon, a bridge to a slim central hub, and stacked rings of server pods below. Compute takes nearly all of the volume; only a small mixed-use share sits at the top of the hub."
      sources={[
        "https://www.meti.go.jp/press/2026/09/20260911006.html",
        "https://www.meti.go.jp/press/2025/06/20250612001/20250612001.html",
        "https://www.mlit.go.jp/english/maritime/mega_float.html",
        "https://www.microsoft.com/en-us/research/project/natick/overview/",
        "https://www.aalo.com/technology",
        "https://www.rosenergoatom.ru/en/for-journalists/highlights/35050/",
      ]}
    >
      <Callout tone="info" lead="A concept, not a build plan.">
        This is a thought experiment, not a build plan. Every size and capacity in this sketch is a rough concept estimate, unless it is a cited figure from an existing project or a company's published spec. Nothing here has been engineered, permitted, or costed.
      </Callout>

      <Image
        src="asset:concept.jpg"
        alt="Aerial concept of Kaiyō DC as a ring-shaped island in a Japanese bay. The ring roof is a flush dark solar-tiled deck. The inner courtyard is a forest around a lagoon, under a semi-transparent solar-glass canopy, with a glass observation tube descending into the water at the center. A crane and service bay sit on a separate segment of the ring, away from the garden. Wave energy converters form a breakwater on the outer edge."
        caption="An atmospheric concept view, not a surveyed design. The architectural sketches further down show the current Layout C more clearly, including the bridge, the slim central hub, and the stacked server-pod rings. Sizes are a rough guess."
        ratio="16 / 9"
      />

      <TableOfContents
        items={[
          { label: "Where the idea came from", id: "idea" },
          { label: "The design", id: "design" },
          { label: "Three layouts", id: "layouts" },
          { label: "Architectural sketches", id: "sketches" },
          { label: "3D model", id: "model-3d" },
          { label: "Built in modules", id: "modules" },
          { label: "Servicing and the pod rings", id: "shaft" },
          { label: "Hub, train and leak safety", id: "hub-train" },
          { label: "Hub scales with ring size", id: "hub-scale" },
          { label: "Tethered free-floating compute pods", id: "tethered-pods" },
          { label: "Power and storage", id: "power" },
          { label: "Heat: use it before it hits the sea", id: "heat" },
          { label: "An optional later nuclear module", id: "smr" },
          { label: "Power options and redundancy", id: "power-options" },
          { label: "Network and routing", id: "network" },
          { label: "Redundancy, food and self-sufficiency", id: "self-sufficiency" },
          { label: "Water and treatment", id: "water" },
          { label: "Why Japan fits", id: "japan" },
          { label: "Placement", id: "placement" },
          { label: "Sea vs. space", id: "sea-vs-space" },
          { label: "Kaiyō vs Starmind", id: "starmind" },
          { label: "Precedents", id: "precedents" },
          { label: "Open challenges", id: "challenges" },
          { label: "Sources", id: "sources" },
        ]}
      />

      <Section heading="Where the idea came from" id="idea">
        <Text>
          This started years ago as a floating Tesla factory for Japan, with water power underneath and solar on top. Tesla already has a plant in China, and a datacenter is a better fit for a floating platform anyway: it mostly needs power and cooling, which this design already tries to bring with it. The factory idea grew into Kaiyō DC — a little energy island, named for the open sea. The goal is to make a datacenter beautiful: an island people might actually want to visit, with the computers hidden in the water below. If a town is going to live with a compute site nearby, a garden you can walk through is a different offer than a windowless box, and that may help with local acceptance. And yes, it is worth floating.
        </Text>
      </Section>

      <Section heading="The design" id="design">
        <Text>
          All three layouts start from the same idea: a ring of modular segments, in the same spirit as Apple Park's circular campus, moored in a sheltered bay. In this sketch the ring is about 1 km across, a rough estimate, and smaller than Odaiba. It would be built in phases and assembled from linked segments rather than as one giant hull. The walkthrough below, the atmospheric picture, and the architectural sketches follow Layout C. Layouts A and B are alternatives, described next. Candidates for a bay are under Placement.
        </Text>
        <Properties
          items={[
            { label: "Ring roof", value: "A flush, walkable solar-tiled deck covering the entire ring, with staff spaces, batteries, and power gear underneath." },
            { label: "Inner courtyard", value: "A lightweight green-roof forest, planted in a shallow soil system the structure can carry, around a smaller central lagoon. A glass observation tube drops from the center into the water so visitors can see marine life and the lit server pods." },
            { label: "Bridge and hub", value: "A pedestrian bridge spans the lagoon to a slim central tower. A few elevators in the hub are the main vertical core for people: they go down to the observation-tube level and on through the stacked pod rings." },
            { label: "Mixed-use core", value: "Only a small share, and only at the top of the central hub: a few floors of staff living quarters, offices, and a small number of shops and cafés with lagoon views. This is a rough concept estimate, not a calculated split — do not picture a town that takes over the island." },
            { label: "Courtyard glazing", value: "Semi-transparent solar glass — building-integrated PV that passes some daylight to the trees while still generating power. It makes less electricity per square meter than the opaque tiles on the ring roof, and that trade-off has to be balanced against the light the plants need." },
            { label: "Service segment", value: "The crane, cargo lift, heavy pod-lift, and boat dock stay on a separate segment of the ring, so the garden stays peaceful and the hub stays slim." },
            { label: "Below", value: "A few stacked circular rings hang under the island, like an inverted tiered cake. Nearly every level is connected GPU and server pods with an internal circular corridor, linked to each other and to the central elevator hub. That large majority of the volume is compute — a rough concept estimate, not a measured program." },
            { label: "Bottom tubes", value: "Only the lowest ring sends vertical tubes down to the seabed, for anchoring or a deep cold-water intake. That is a concept option, not a sized system." },
            { label: "Outer edge", value: "Wave energy converters form a breakwater around the ring, taking energy from the waves and calming the water before it reaches the island." },
            { label: "Depth, rough estimate", value: "Tens of meters down, under typical typhoon wave action. The manned elevator core is what keeps that depth modest." },
            { label: "Cooling", value: "Passive seawater cooling around the pods. The bottom-ring tubes could also draw deeper, colder water, as a concept option. Useful heat is reused first — desalination, the forest, the hub, a sento, and possibly aquaculture — and whatever is left is spread through deep diffusers. The cascade is in Heat: use it before it hits the sea." },
            { label: "Links to shore", value: "A subsea power cable and fiber, plus a backup landing point. Umbilicals carry power and fiber from the surface down to the pods." },
            { label: "Storms", value: "The outer converters act as a breakwater, the ring segments can flex at their joints, and the inner courtyard stays calmer than the open sea. The computers stay below." },
          ]}
        />
        <Text>
          The computers are not on the deck. They sit in sealed, Natick-style pods in the stacked rings under the structure, where the temperature is steadier and the worst waves pass overhead. People and batteries stay dry under the tiled roof and in the small mixed-use floors at the hub top. The courtyard is for walking and looking, not for heavy lifting.
        </Text>
        <Text>
          The whole roof of the ring is covered in solar, but not as a farm of tilted, racked panels. The deck is a set of flat, modular, walkable solar tiles, flush with the surface, in the same spirit as a Tesla Solar Roof. That is a comparison for the look and the idea — walkable tiles you can swap — not a claim that Tesla makes a marine product. The tiles would have to be sealed against saltwater as part of this concept. The only breaks in that tiled surface are the openings that have to be there, including hatches on the ring and the openings on the service segment.
        </Text>
        <Text>
          The upside of the opaque tiles is a low wind profile in a typhoon, because nothing sticks up to catch the gale; a surface you can walk on; and tiles that can be swapped one at a time, which fits the modular theme. The trade-offs are real too. A flat tile usually makes less power per square meter than a tilted panel that faces the sun more directly. A dark, flush deck will also run hot, and salt spray and soiling will need a regular cleaning plan. Over the forest, the courtyard is glazed with semi-transparent solar glass: building-integrated PV that lets some daylight through to the trees while still generating power. The same approach would apply to any planted-courtyard version of the ring, not only the fully forested one. The trade-off is straightforward and has to be faced honestly: that glass is less efficient than the opaque tiles on the ring roof, and the design has to leave enough light for the plants. This is a concept choice, not a product specification.
        </Text>
        <Callout tone="info" lead="Mixed-use core.">
            A short note on proportion, as a rough concept estimate, not a calculated program: nearly all of the island's volume, and almost every level of the stacked rings below, is given over to GPU and server pods. The mixed-use core sits only at the top of the central hub — a few floors of staff living quarters, offices, and a small number of shops and cafés with lagoon views. It is a small share of the whole, not a town that takes over the structure.
          </Callout>
        <Diagram
          direction="vertical"
          nodes={[
            { id: "solar", label: "Solar-tiled ring", kind: "box" },
            { id: "wave", label: "Wave converters", kind: "box" },
            { id: "grid", label: "Shore grid backup", kind: "box" },
            { id: "smr", label: "Optional later SMR", kind: "box" },
            { id: "bat", label: "Battery modules", kind: "box" },
            { id: "pods", label: "Server pods", kind: "box" },
            { id: "cool", label: "Seawater cooling", kind: "box" },
            { id: "fiber", label: "Fiber to shore", kind: "box" },
          ]}
          edges={[
            { from: "solar", to: "bat" },
            { from: "wave", to: "bat" },
            { from: "grid", to: "bat", dashed: true },
            { from: "smr", to: "bat", dashed: true, label: "later phase" },
            { from: "bat", to: "pods", label: "umbilicals" },
            { from: "pods", to: "cool" },
            { from: "pods", to: "fiber" },
          ]}
        />
      </Section>

      <Section heading="Three layouts" id="layouts">
        <Text>
          These are three ways the same modular ring could be dressed. None of them is a finished design. The picture and the sketches on this page show Layout C.
        </Text>
        <Rows
          rows={[
            {
              title: "Layout A — the solar-tiled ring",
              detail: "An Apple Park-style ring of modular segments, with the whole roof in flat, walkable solar tiles in the spirit of a Tesla Solar Roof — a comparison for the look and the idea, not a claim that Tesla makes a marine product — and wave energy converters on the outer edge as a breakwater. There is no biosphere. The payoff is a low wind profile in a typhoon and more power per square meter from opaque tiles than from solar glass. The trade-off is a simpler courtyard, with less of a garden to visit.",
            },
            {
              title: "Layout B — a glazed biosphere dome",
              detail: "A glazed dome over the courtyard, in the spirit of two land precedents. Biosphere 2, in Oracle, Arizona, is a large sealed glass enclosure whose construction began in 1986, with two crew missions between 1991 and 1994; the University of Arizona has owned it since July 2011. The Eden Project in Cornwall, designed by Grimshaw Architects, opened on March 17, 2001, with Rainforest and Mediterranean biomes made of joined domes. Those are land buildings, not marine ones. The trade-offs are serious: a tall dome catches more wind than Layout A's flush tiles; glass or foil at sea would have to stand up to salt, storms, and constant cleaning; the weight sits on a floating platform; heat and humidity build up under glazing; and if the skin is semi-transparent solar glass, it makes less power than opaque tiles and still has to leave enough light for the plants. A fully sealed closed ecosystem, like Biosphere 2's early missions, is a much harder problem than an open conservatory like Eden. This sketch does not assume a sealed closed system.",
            },
            {
              title: "Layout C — the donut biosphere, as drawn",
              detail: "A glazed torus of semi-transparent solar glass around an open central lagoon, with a glass observation tube at the center. A bridge spans the lagoon to a slim central elevator hub. Beneath the island, a few stacked circular rings of server pods hang like an inverted tiered cake, each with an internal corridor, linked to each other and to the hub. Only the bottom ring sends vertical tubes down to the seabed, for anchoring or a deep cold-water intake. Cargo and heavy pod lifts stay on a separate service segment. Compute takes nearly all of this volume; mixed use is only a small share at the top of the hub. Those proportions are a rough concept estimate.",
            },
          ]}
        />
      </Section>

      <Section heading="Architectural sketches" id="sketches">
        <Text>
          These are concept sketches, not construction drawings, and they are not to scale. They show Layout C as it stands now: the modular ring, the solar-tile roof, the forested courtyard and lagoon, the bridge to the central hub, the service segment, the wave converters, and the stacked server-pod rings below. A waste-heat thermal desalination unit, with reverse-osmosis backup, sits in the service segment. It takes seawater from an intake on the seaward side, sends brine to a diffuser outfall away from the lagoon, and stores freshwater in tanks that feed the hub and the forest. That plant is a concept, not a sized system. Labels that mention a large majority or a small share are rough concept estimates, not a calculated program.
        </Text>
        <Image
          src="asset:site-plan.jpg"
          alt="Architectural ink-and-pencil site plan of Kaiyō DC Layout C, not to scale: a modular ring with a flush solar-tile roof, a glazed biosphere ring and forested courtyard around an inner lagoon, a bridge to a slim central elevator hub with a small mixed-use core and an observation tube, a service segment with crane, dock, waste-heat desalination with RO backup, freshwater tanks feeding the hub and forest, a seaward seawater intake, and a brine diffuser outfall away from the lagoon, plus wave converters on the outer edge and dashed stacked server-pod rings below."
          caption="Concept site plan of Layout C, not to scale. The service segment now also holds a waste-heat desalination plant with RO backup, a seaward intake, freshwater tanks feeding the hub and the forest, and a brine diffuser outfall kept away from the lagoon. Mixed use remains a small share at the hub top. The stacked rings are server pods, the large majority of the volume, as a rough estimate."
          ratio="16 / 9"
        />
        <Image
          src="asset:cross-section.jpg"
          alt="Architectural ink-and-pencil cross-section of Kaiyō DC Layout C, not to scale: a solar-tiled surface ring, a donut-shaped glazed biosphere around an open lagoon, a bridge to a slim central hub with a small mixed-use band at the top, elevators down past an observation level through a central core, three stacked underwater rings of server pods with circular corridors, bottom-ring tubes to the seabed, and on the service side a waste-heat desalination unit with RO backup, a seawater intake from open sea, freshwater tanks feeding the hub and forest, and a separate brine diffuser outfall away from the lagoon."
          caption="Concept cross-section of Layout C, not to scale. The desalination plant sits in the service segment: seawater intake from the open sea, waste-heat thermal desalination with RO backup, freshwater tanks feeding the hub and the forest, and a separate brine diffuser outfall away from the lagoon. Nearly all of the stacked rings remain GPU and server pods. Mixed use is only a small share at the hub top. These are rough concept estimates."
          ratio="16 / 9"
        />
      </Section>

      <Section heading="3D model" id="model-3d">
        <Text>
          This is a first 3D blockout of Layout C, built in Blender from a Python script. It is a stylized massing model at a rough concept scale, not an engineered or photoreal design. The whole outer ring is now the biosphere: one continuous, low, aerodynamic donut shell about 1 km across and about 36 m tall at the crown. Semi-transparent solar glass covers the top and inner faces, and solar tiles cover the outer and lower faces. Rib bands every 7.5° mark the module joints and the storm shutters. The forest grows inside the shell. The lagoon stays open in the donut hole, with a bridge to the slim hub tower, which has mixed-use floors only at the top and a glass observation tube going down into the water. An outboard service apron holds the crane, an inclined pod-lift shaft, the dock, the desalination block, freshwater tanks, the seawater intake and the brine outfall. Wave converters ring the outside. Below the water, three stacked rings of GPU pods with corridors sit like an upside-down wedding cake, with spokes to the core. Only the bottom ring has legs down to the seabed. Umbilicals, an export cable and mooring lines are shown too.
        </Text>
        <Image
          src="asset:model-hero.jpg"
          alt="3D blockout render, aerial view: a continuous glazed donut-shaped biosphere ring with rib bands and trees inside, around an open lagoon with a bridge to a slim central hub tower, an outboard service apron with crane, tanks and a dock, yellow wave converters around the outside, and the stacked server-pod rings faintly visible through the water."
          caption="Hero aerial render of the 3D blockout (Blender 4.2, Cycles). Rough concept scale."
          ratio="16 / 9"
        />
        <Image
          src="asset:model-cutaway.jpg"
          alt="3D blockout cutaway with the near half removed: the hub tower and elevator core descending past the observation level, three stacked rings of server pods with corridors and spokes stepping inward with depth, legs from the bottom ring to the seabed, orange umbilicals, and the cut end of the glazed biosphere shell at the waterline."
          caption="Cutaway section: the near half is removed to show above and below the waterline. Nearly all of the submerged volume is GPU and server pods."
          ratio="40 / 17"
        />
        <Image
          src="asset:model-fly.gif"
          alt="Animated preview of the 3D flythrough: the camera orbits from a high aerial view, descends to sea level, and dips below the waterline to look up at the stacked pod rings under the biosphere ring."
          caption="Flythrough preview, about 15 s, orbiting from the air and dipping below the waterline. The full 720p MP4 is kept with the Blender files."
          ratio="16 / 9"
        />
      </Section>

      <Section heading="Built in modules" id="modules">
        <Text>
          The island is not one piece. It is a ring of pontoon segments — steel or concrete arcs — built in shipyards, which is work Japan already knows how to do. Tugs tow each segment to the bay, and flexible connectors join them into the donut so the ring can flex in a storm instead of fighting the sea as a rigid slab.
        </Text>
        <Rows
          rows={[
            { title: "Grow in phases", detail: "Start with a lagoon, a few ring segments, and a shaft, then add more segments, pods, and solar tiles as demand and permits allow." },
            { title: "Swap for maintenance", detail: "A tired or damaged module can be unhooked and towed back to a yard, while a fresh one takes its place." },
            { title: "Isolate trouble", detail: "If one module is holed or flooded, it can be cut off from its neighbors so the rest of the island keeps working." },
            { title: "Give each module a job", detail: "Power, storage, the forested courtyard, a quiet visitor path, a separate service segment, a slim mixed-use hub top, and the stacked compute rings each have a set role, so the island is easier to build, repair, and live with." },
          ]}
        />
      </Section>

      <Section heading="Servicing and the pod rings" id="shaft">
        <Text>
          People reach the pods by walking the bridge to the central hub and riding a few elevators down. Those cars go first to the glass observation-tube level, then continue through the stacked rings as a dry, about 1 atm core, with an emergency ladder alongside. Cargo and heavy pod lifts stay at the service segment, so the hub can stay slim and the garden can stay quiet.
        </Text>
        <Text>
          Beneath the island, a few stacked circular rings hang like an inverted tiered cake. Each ring is a level of connected server pods with an internal circular corridor, linked to the rings above and below and to the central elevator hub. Nearly all of that stack is compute. If one pod is breached, a watertight hatch can close and isolate it. Day to day, failed hardware can come up through the hub or go out to the service segment. For major work, a whole pod can still be unhooked and crane-lifted at the service bay, which also serves as a protected boat dock. Visitors do not share that bay. They walk the forest, use the small mixed-use floors at the hub top, and, at the center of the lagoon, can look down through a glass observation tube at marine life and the lit pods — a thought-experiment amenity, not a worked-out aquarium. Only the bottom ring has vertical tubes going down to the seabed, for anchoring or a deep cold-water intake.
        </Text>
        <Callout tone="warning" lead="The shaft is a trade-off.">
          The central core becomes a structural member and a potential leak path. It also limits how deep the stacked rings can sit — in this sketch, roughly tens of meters, a rough estimate — because a manned, one-atmosphere trunk is not a deep-sea design. A dry core needs serious humidity and condensation control, or the electronics and the shaft itself will suffer.
        </Callout>
        <Text>
          That is a different bet from Microsoft's Project Natick. The Northern Isles module, deployed at the European Marine Energy Centre off Orkney in June 2018 and retrieved in July 2020, was a sealed, no-access vessel filled with dry nitrogen. Nobody walked inside during those two years. Microsoft reported that the servers failed at one-eighth the rate of a land-based control group, and argued that a stable, people-free environment helped. Kaiyō keeps the sealed-pod idea, then adds a way in through the central core, so parts can be swapped without waiting years to haul a whole ring up. The cost of that convenience is the manned core itself.
        </Text>
      </Section>

      <Section heading="Hub, train and leak safety" id="hub-train">
        <Callout tone="info" lead="A concept for access, not a tunnel design.">
          Depths and tube materials below are rough concept estimates. No submerged floating tunnel has been built anywhere. A real crossing would have to be designed by licensed engineers and permitted as a marine structure.
        </Callout>
        <Text>
          In the present sketch, people reach the island by boat and then walk the bridge to the hub elevators. A later idea is an underwater train from shore, so staff, visitors, and light cargo can still arrive when the sea is rough, and so a second utilities path can run with the train.
        </Text>
        <Text>
          The mid-bay stretch would be a submerged floating tunnel, tethered at about 20–30 m depth — a rough concept estimate — so it stays in that band instead of sitting on the seabed. Norway has studied this idea in detail, including the Høgsfjord project, which was judged feasible for construction but was not built. No submerged floating tunnel has been completed. Near shore, where the water is shallower, the line could switch to an immersed tube, a method already used for road and rail crossings. Tokyo Bay Aqua-Line is a nearby Japanese precedent for a long undersea highway, but its undersea section is a shield-bored tunnel, not an immersed tube, and that distinction matters. The train would arrive at a station in the hub base, routed between the compute rings. It could carry fiber and power, but a second, separate cable route would still be kept, so a tunnel fault does not take down the island's links.
        </Text>
        <Text>
          The tube, in this sketch, is a hybrid: concrete for the deeper stretches, large acrylic view sections nearer the surface, and glass above the waterline. That is a look and a concept, not a product specification. Water pressure rises by roughly one atmosphere for every ten meters of depth, so a 20–30 m floating stretch is still a serious pressure vessel, even if people walk inside it at about one atmosphere. Around the hub core, a Kaiyukan-style spiral walkway would let visitors descend past lagoon windows. A lounge and the sento could have large aquarium windows, in the spirit of a shipboard gallery — a comparison for the look, not a claim about any particular ship. A surface gondola was considered and rejected: a typhoon coast is a poor place for a cable car.
        </Text>
        <Text>
          Leak safety is designed as layers, not as a single door. The tube and the vertical core would be double-walled, with a monitored gap between the skins, sensors, and sump pumps. Every vertical segment would be able to self-seal and self-drain. Automatic pressure doors would close on a fault, and each segment would have its own exit. Elevator shafts would have floodgates, and the train station could be sealed off from the rest of the hub. This is a safety concept, not a certified marine design.
        </Text>
      </Section>

      <Section heading="Hub scales with ring size" id="hub-scale">
        <Callout tone="info" lead="A concept sketch, not an engineered design.">
          These three sizes are a way to think about how the hub grows with the ring. They are not a structural or passenger-flow design, and no dimensions or platform counts have been calculated.
        </Callout>
        <Text>
          The hub should scale with the ring. A small pocket does not need the same core as a kilometer-scale island.
        </Text>
        <Rows
          rows={[
            {
              title: "Small — for a pocket like Harima-nada, off Ieshima",
              detail: "A single hybrid concrete and acrylic tube, in the same spirit as the hub already sketched: a train stop, a Kaiyukan-style spiral walkway, and the aquarium lounge. Network spines and life-safety gear sit in the base.",
            },
            {
              title: "Medium",
              detail: "A larger core with separate shafts for people and for freight or utilities, two train platforms, and the network spines split into two rooms, so a fault in one does not take down the fabric.",
            },
            {
              title: "Large — for a ring on the order of Tokachi–Kushiro, about 1 km or more",
              detail: "A central core with separate tubes for people, freight, and utilities, multiple train platforms, and redundant spine rooms. Satellite hubs and lifts sit around the ring, so a walk to a lift stays short and nobody has to cross half a kilometer of corridor for a ride.",
            },
          ]}
        />
      </Section>

      <Section heading="Tethered free-floating compute pods" id="tethered-pods">
        <Callout tone="info" lead="A thought experiment, still a concept.">
          This is a sketch for a second compute tier, not a mooring or umbilical design. No tether loads, cooling rates, or pod counts have been calculated.
        </Callout>
        <Text>
          Alongside the stacked rings under the island, sealed, buoyant pods could sit in the water on a tether or anchor line — floating at the surface, or held down under tension just below it. Each pod would have an umbilical for power and fiber, and either a cooling line or seawater cooling through the hull, in the same spirit as a sealed Natick-style vessel. The pods would not drift free; the tether is what keeps them on station.
        </Text>
        <Text>
          The basin that holds these pods would be an unmanned, lights-out zone: no residents, and no public access. Swaps would be done by robots or remotely operated vehicles, with the rest of the work watched from ashore or from the service segment. That points to a separate lagoon, or a partitioned basin, kept apart from the food and living lagoon, so the oyster racks, the fish pen, and the visitor path do not share water with the compute pods. The trade-off is less shared space and a more divided island. The gain is simpler heat and safety: leftover warmth, a leak, or a biofouling treatment stays in the compute basin, and people stay out of it.
        </Text>
        <Text>
          The closest working precedents are sealed underwater modules, not lagoon-tethered floaters. Microsoft's Project Natick Northern Isles module sat on the seafloor off Orkney from June 2018 to July 2020. It was a sealed, no-access vessel. Microsoft reported a server failure rate one-eighth that of a land-based control group. Off Lingshui, Hainan, HaiLanYun, part of the Highlander group, has operated a commercial underwater datacenter of sealed, seawater-cooled seabed modules since early 2023, with a further module reported in 2025. Those performance claims are the operator's and state media's, not independently audited here. Both projects are useful for the sealed-pod idea. Neither is a test of a buoyant pod on a wire in a lagoon.
        </Text>
        <Rows
          rows={[
            {
              title: "What this gets you",
              detail: "It fits the swap-not-repair idea already in this design: unclip a tired pod, tow it to the service dock, and hang a fresh one on the same tether. Passive seawater cooling is the same bet as the stacked rings. Capacity can grow by adding pods, without waiting for another ring segment.",
            },
            {
              title: "What to watch",
              detail: "Tethers fatigue, and storms or a tsunami can put a snap load on the line. A single umbilical is a single point of failure, so the sketch assumes dual umbilicals and connectors. Biofouling and corrosion are constants in salt water. Because the pods stay sealed, they cannot be serviced in place; access is by boat or ROV from the lights-out basin. Heat in that basin still has to be watched, even if it is kept apart from the oysters and the fish pens, and a new mooring field would still need permits.",
            },
            {
              title: "A hybrid, for now",
              detail: "The stacked rings under the island would still hold the main compute. The tethered pods would be an expansion tier, or an experimental one, used to try a Natick-style sealed module that can be towed home, without making the whole island depend on it.",
            },
          ]}
        />
        <LinkCards
          links={[
            { title: "Microsoft: Natick retrieval and results", site: "microsoft.com", date: "Sep 14, 2020", href: "https://news.microsoft.com/source/features/sustainability/project-natick-underwater-datacenter/" },
            { title: "Xinhua via official government English site: Hainan underwater computing cluster", site: "www.gov.cn", date: "Feb 19, 2025", href: "https://english.www.gov.cn/news/202502/19/content_WS67b5a14dc6d0868f4e8efcaa.html" },
          ]}
        />
      </Section>

      <Section heading="Power and storage" id="power">
        <Text>
          Day-to-day power in the first phases would come from the opaque solar-tiled ring, the semi-transparent solar glass over the courtyard, wave energy converters on the outer edge, and a shore cable as backup. None of those sources is perfectly steady, so dedicated storage modules sit on the surface to smooth the swings and cover short gaps.
        </Text>
        <Text>
          A familiar model for those modules is Tesla Megapacks: large, factory-built battery units used on land to smooth renewable power. Sodium-ion packs are an appealing chemistry here. Sodium is much more abundant than lithium, so cells are widely expected to cost less at scale, though prices are still settling as production ramps. They are generally considered less fire-prone than many lithium-ion chemistries. They are also typically heavier than high-energy lithium-ion packs for the same stored energy, which matters much less on a moored platform than in a car. CATL says its Naxtra passenger-EV sodium-ion cell reaches an energy density of 175 Wh/kg, which the company calls the highest among mass-produced sodium-ion cells and comparable to LFP lithium-ion batteries. That is a company figure for a vehicle cell, not a marine-pack rating. On a moored platform the mass penalty versus a high-energy lithium pack matters less than it would in a car, but the modules still take volume on the deck, so density still affects how much ride-through you can fit. CATL's Naxtra line reached GWh-scale industrialization in 2026, with the company saying full-scale mass production would begin by the end of that year, and a Changan passenger vehicle announced for mid-2026. BYD has also moved sodium-ion into early commercial use; trade reports in January 2026 described a mass-produced sodium-ion forklift, and BYD later said it had applied the chemistry in forklifts, with broader production timing depending on demand.
        </Text>
        <Text>
          Electrical batteries are not the only store this island could use. A sand battery — a thermal store that heats a silo of sand or a similar solid, then gives the heat back later — is a better fit for the reuse cascade than for keeping GPUs up, because desalination, the forest, the hub, the sento, and the greenhouses want heat, not electrons. Polar Night Energy's first commercial unit, built with the utility Vatajankoski in Kankaanpää, Finland, and in operation since 2022, is a steel vessel about 4 m wide and 7 m high with about 100 tonnes of sand. The company lists 200 kW of heating power and 8 MWh of capacity, and says the sand is heated to about 500–600°C. Vatajankoski already uses that store to raise waste heat from data servers — about 60°C, in the company's account — to about 75–100°C before the heat goes into the district-heating network. Polar Night Energy later commissioned a larger unit in Pornainen, Finland, in June 2025, which it lists at 1 MW of thermal power and 100 MWh of capacity. Those are land plants and company figures, not a sized marine design. On Kaiyō, a store like this would sit with the heat cascade, not in place of the Megapacks or sodium-ion packs that give compute its ride-through. Surplus electricity could charge it; leftover server heat could be lifted into it, or past it, with heat pumps. Turning that stored heat back into electricity is not assumed here. Polar Night Energy says it is still developing that path.
        </Text>
        <Text>
          A more speculative future option is a seawater battery, which uses seawater as the cathode. Researchers at UNIST in South Korea, led by Youngsik Kim, have worked on this design since the mid-2010s. It is still experimental, not a product you can order for a platform like this, and it stays in the concept file for later.
        </Text>
        <Text>
          A later note on roles: in the current concept, wave, solar, and tidal power are supplemental and are dedicated first to the living, retail, and hub spaces, plus life-safety loads. Compute is meant to run on primary sources — a shore cable and, if they are ever added, reactor pods — with Megapacks for ride-through. The options, the shared microgrid, and the load priority are in Power options and redundancy.
        </Text>
      </Section>

      <Section heading="Heat: use it before it hits the sea" id="heat">
        <Callout tone="info" lead="A concept, not a sized thermal plant.">
          This is a reuse cascade, not a calculated heat budget. No temperatures, flow rates, or fish-farm yields are offered here because none have been modeled for this island.
        </Callout>
        <Text>
          The servers make a lot of heat. The first job is to use as much of that heat as possible, on the island, before any of it is given back to the sea. The GPU cooling loop itself stays closed and runs on pure, deionized water. Minerals in that loop would cause scaling and corrosion. Heat leaves the loop only through heat exchangers, so the desalination plant, the forest, the hub, and the baths never run on the same water that cools the chips.
        </Text>
        <Rows
          rows={[
            {
              title: "Thermal desalination",
              detail: "Server waste heat drives the waste-heat desalination unit in the service segment, with reverse osmosis as backup, as already sketched.",
            },
            {
              title: "The forest",
              detail: "Leftover warmth can heat the biosphere ring, so the glazed courtyard stays milder for the trees.",
            },
            {
              title: "District heating",
              detail: "The same loop can provide district heating for the small mixed-use floors at the top of the hub — the staff living quarters, offices, and shops.",
            },
            {
              title: "A sento, and pools",
              detail: "A GPU-heated bathhouse and pools in the hub, with lagoon views, are part of the visit. They get heat only through a heat exchanger; they never share the deionized cooling water. Onsen-style minerals or bath salts, if used, are added by a separate dosing pump on the bath side only. This would still be a sento: a public bath of heated water. Under Japan's Hot Spring Act, a true onsen is water that issues from the ground and meets a legal temperature or mineral test. Dosing salts into heated desalinated water does not qualify. Shipping in qualifying spring water would be a separate, speculative path, and is not assumed here.",
            },
            {
              title: "Aquaculture",
              detail: "Whatever heat is still useful could warm a fish farm or other aquaculture, on the island or ashore, as a later option.",
            },
            {
              title: "Heat pumps, and a sand store",
              detail: "When the waste heat is not quite hot enough for desalination, the sento, district heating, or a thermal store, a heat pump can lift the temperature. Polar Night Energy's Kankaanpää plant already uses a sand battery to prime data-server waste heat for a district-heating network. A similar store on this island would hold surplus heat, or surplus electricity stored as heat, for later use in the cascade. It would not replace the electrical batteries that keep the GPUs up. No pump sizes, COPs, or store volumes are offered here, because none have been designed for this island.",
            },
          ]}
        />
        <Text>
          Whatever heat is left after that cascade is discharged through wide, deep diffusers, so the temperature rise in the surrounding water stays small. On Project Natick, a much smaller underwater vessel than this island, Microsoft's Ben Cutler said in a September 2018 Microsoft Research podcast that the seawater leaving the vessel was about 0.8°C warmer than the water coming in, and that on the first deployment the rise a few meters downstream was only a few thousandths of a degree, because the discharge mixed quickly. That finding is encouraging, and it is not a guarantee for a kilometer-scale ring of GPU pods. This concept still has to spread the leftover heat, and then prove the local rise stays small.
        </Text>
        <Text>
          A ring of temperature sensors would watch the water around the island. If the readings approach agreed limits, the plan is to throttle GPUs, or to pull more heat into the reuse cascade, until the water is back inside the band. Those limits would have to be set with fisheries and regulators, not invented in this sketch.
        </Text>
      </Section>

      <Section heading="An optional later nuclear module" id="smr">
        <Callout tone="info" lead="Speculative, and not phase 1.">
          A small modular reactor could be added much later as a baseload power module, sitting alongside the battery packs that would still smooth the rest of the island. The figures below are Aalo Atomics' published specs for a land plant, not a calculated marine design. First commercial Pod construction is a company target for 2028, not a finished plant.
        </Callout>
        <Text>
          The reference design is the Aalo Pod, from Aalo Atomics, a factory-built 50 MWe plant aimed at AI datacenters. According to the company's technology page, a Pod is five 10 MWe Aalo-1 sodium-cooled thermal reactors sharing multiple turbines, shipped as truck-transportable modules, and run at near-atmospheric pressure. Aalo says shutdown is automatic and passive, with more than 72 hours of fully passive decay-heat removal. In an April 2025 announcement, the company also described a compact land footprint of 100 MW on less than five acres, and said an N+1 arrangement can keep the plant producing power — including full-rated output with one reactor offline — during maintenance or refueling. With phased maintenance, Aalo says the Pod is never fully offline.
        </Text>
        <Callout tone="warning" lead="Sodium and seawater do not mix.">
          The Aalo-1 is cooled by liquid sodium, which reacts violently with water. Aalo's Pod is a land product, not a marine one. Any later attempt to put a module like this on Kaiyō would have to be a sealed, double-hulled, elevated deck unit with no seawater contact. That is a serious design problem, not a footnote, and it is one reason this stays a long-horizon option.
        </Callout>
        <Text>
          A real floating nuclear plant does already exist, but it is a different machine. Russia's Akademik Lomonosov, with two 35 MWe KLT-40S reactors for 70 MWe in all, entered commercial operation at Pevek, in Chukotka, on May 22, 2020, after first sending power to the grid in December 2019. It is a useful precedent for "a nuclear plant can float." It is not a precedent for putting a sodium-cooled Aalo Pod on this island.
        </Text>
        <Text>
          In Japan the hurdle is as much social and legal as it is technical. After Fukushima, any reactor would need a Nuclear Regulation Authority license and, in practice, the consent of the host community. A foreign design, on a floating platform, in a fishing bay, would be a long process. This module is a later-phase idea to keep on the list, not part of a first build.
        </Text>
      </Section>

      <Section heading="Power options and redundancy" id="power-options">
        <Callout tone="info" lead="Concept options, not a power-system design.">
          The split, the microgrid, and the options below are a thought experiment. Reactor figures are company specs or reported research results, not a marine license. A real design would have to be done by licensed engineers, and in Japan any reactor would still need Nuclear Regulation Authority approval and, in practice, host-community consent.
        </Callout>
        <Text>
          The island is meant to run as one shared microgrid, with bidirectional ties between the living side and the compute side. Wave, solar, and tidal power are supplemental. They are dedicated first to the living, retail, and hub spaces, and to life-safety loads — lights, pumps, communications, and fire and flood systems. Compute is meant to run on primary sources: the shore cable, and reactor pods if they are ever added, with Megapacks now, and sodium-ion packs later, for ride-through.
        </Text>
        <Text>
          Surplus can flow either way. Excess wave or solar can feed compute or charge the Megapacks. Excess primary power can back up the living and retail side. In a shortage, the priority is life safety first, then living and retail, then compute. Compute throttles first. No single power source is treated as critical. The plan is N+1 where it can be afforded, dual independent cable paths around the ring, one or more shore cables, and battery ride-through at each compute pod.
        </Text>
        <Table
          columns={["Option", "How it works", "What to watch"]}
          rows={[
            [
              "A — renewables, Megapacks, and a shore cable, with no nuclear",
              "Compute runs on the shore cable, with Megapacks for ride-through. Wave, solar, and tidal power serve living, retail, hub, and life-safety loads, and can spill the other way when there is surplus.",
              "The simplest first phase, and the one that avoids a reactor license. Compute then depends on the shore link and the batteries. A single cable is not enough; this option still wants more than one landing if the cluster grows.",
            ],
            [
              "B — one Aalo Pod-class module",
              "A later baseload block for compute, alongside the shore cable and the Megapacks. An Aalo Pod is not one reactor: Aalo's published land design is five 10 MWe Aalo-1 sodium-cooled reactors, for 50 MWe in all, sharing turbines.",
              "Sodium reacts violently with water, so a marine version would have to be a sealed, double-hulled, elevated unit with no seawater contact, as already noted. One Pod still concentrates five reactors in a single module. First commercial Pod construction is a company target for 2028, not a finished plant, and not a marine one.",
            ],
            [
              "C — a few separate reactor pods",
              "Each reactor sits in its own sealed, double-walled vertical pod, in a hardened power segment on the leeward side, away from people and from the compute rings. The units could be Aalo-1-class machines, or, later, a thorium molten-salt design if one ever becomes a real product.",
              "Better isolation than packing five cores in one module, but more reactors mean more licensing, security, staff, and fuel handling. Keep the count as low as demand allows. Thorium molten-salt reactors of this type are designed to run near atmospheric pressure, and the fuel salt does not react violently with water the way liquid sodium does. They are not commercial. China's 2 MWt TMSR-LF1 experimental reactor at Wuwei, in Gansu, is reported to have reached full power in June 2024 and to have had thorium added to the salt in October 2024. Copenhagen Atomics is developing a container-size thorium molten-salt unit; that is a company development program, not a plant you can order.",
            ],
            [
              "D — a hybrid",
              "Shore cable and, later, one or more reactor pods as primary power for compute, with Megapacks for ride-through, and with wave, solar, and tidal still dedicated first to living, retail, and life safety. Bidirectional ties remain, so surplus can move either way.",
              "The most flexible long-term sketch, and the most to permit. The reactor count should still stay as low as the load requires.",
            ],
          ]}
        />
        <Text>
          This sketch starts mid-size, on the order of tens of thousands of GPUs — a rough concept estimate, not a rack count. A later scale-up toward a Colossus-1-class cluster would wait until the island can count on about 300 MW of primary power from shore cables, reactor pods, or both. xAI has described Colossus at about 200,000 GPUs. Contemporaneous reports have put the electrical draw around 250 MW, and utility-related reporting has described campus grid service in a 150–300 MW range. Those figures are reported, not independently audited here, and the 300 MW match is a rough concept scale, not a calculated island load.
        </Text>
      </Section>

      <Section heading="Network and routing" id="network">
        <Callout tone="info" lead="A network concept, not a bill of materials.">
          No throughput, latency, or port counts are offered here, because none have been designed for this island.
        </Callout>
        <Text>
          Inside each pod and rack, short copper links — direct-attach copper, or DAC — keep the last hop simple. Between pods, between rings, into the hub, and along the subsea path, the concept uses fiber. The fabric is a leaf-spine: spine switches sit in the hub, leaf switches sit with the pods, and traffic can take equal-cost paths, or ECMP, so one cut does not black-hole a ring. Fiber would run both ways around the ring, with spokes into the hub and dual vertical links, so a single riser is not a single point of failure. InfiniBand or Ultra Ethernet are options for the tight GPU fabric; this sketch does not pick a vendor.
        </Text>
        <Text>
          At the border, BGP routers would hand off to two or more subsea fibers landing at separate shore stations. Subsea fiber stays the primary path. Starlink is a last-resort backup only, for critical and management traffic, not for full training workloads. In this sketch it would be arrays of dishes — dozens per site, a rough concept scale, not a counted design — at two or three separated sites: the top of the hub tower, a cluster on the leeward service segment, and low-profile flat units set into the outer ring shell. The sites would be bonded and load-balanced through multi-WAN routers, so the backup degrades gracefully if one site is lost. Because storm shutters cannot cover a dish that is in use, the mounts would need radomes or other wind shelter. Each site would have its own power and fiber path. Per-dish throughput is not budgeted here beyond a few hundred Mbps-class, as an order of magnitude, not a link design.
        </Text>
        <Text>
          The visitor and housing network would be separate and firewalled from the compute fabric, so a café connection cannot wander into the training cluster.
        </Text>
      </Section>

      <Section heading="Redundancy, food and self-sufficiency" id="self-sufficiency">
        <Callout tone="info" lead="A 30-day target, not a calculated stores list.">
          The cutoff period, the farm layout, and the stores are a concept for keeping people safe first. No yields, calorie counts, or tank sizes are offered here.
        </Callout>
        <Text>
          The target, as a concept, is about 30 days of cutoff: the island should be able to keep people safe and supplied if the shore link is lost, and only then worry about how much compute can stay up. People first, then compute. Drinking water, wastewater, and the cooling loop are in Water and treatment. Storage tanks in the service segment would be sized toward that 30-day cutoff, as a concept, not a calculated volume. A spare-parts depot, a module workshop, a small medical bay, and stores of food and fuel would sit on the service side, away from the garden.
        </Text>
        <Text>
          The lagoon is imagined as a satoumi — a tended, productive inshore water, not a sealed aquarium. Oyster and seaweed racks would sit in the open lagoon. A fish pen would be closed off upstream of those racks, with its own isolation gate, so a disease or a spill can be cut off. The idea is integrated multi-trophic aquaculture, or IMTA: the plants and shellfish can take up nutrients the fish produce. Any warmth from the heat cascade would be gentle only, watched by the same sensor ring already described, with a flushing channel to exchange lagoon water. A tuna pen would sit outside the ring, on the sheltered leeward side, not in the lagoon. Kindai University reported the first complete aquaculture of Pacific bluefin tuna in 2002; that is a land-and-pen precedent for fully farmed bluefin, not a design for this island. Greenhouses on the service or ring deck could use leftover waste heat.
        </Text>
        <Text>
          An honest note: this would not be net zero. Steel and concrete have a large embodied cost, GPUs are refreshed on a short cycle, and a shore cable still draws from the grid. The honest pitch is lower-impact than a typical land campus of the same compute, not zero-impact. Many of the pieces already exist — desalination, fiber, batteries, leaf-spine networks, oyster racks, immersed tubes, even a floating nuclear plant of a different design. Some do not: no submerged floating tunnel has been built, and a commercial thorium molten-salt reactor, or a marine version of a sodium-cooled Aalo Pod, is still ahead of us. The design is the integration. It still has to be engineered, permitted, and costed.
        </Text>
      </Section>

      <Section heading="Water and treatment" id="water">
        <Callout tone="info" lead="A concept sketch, not an engineered or permitted plant.">
          The three loops below are a way to think about drinking water, wastewater, and cooling. No plant sizes, tank volumes, or discharge rates have been calculated, and nothing here has been engineered or permitted.
        </Callout>
        <Text>
          Water on the island would run in three loops that stay separate. Drinking water, wastewater, and the cooling circuit should not mix.
        </Text>
        <Rows
          rows={[
            {
              title: "Drinking water",
              detail: "Seawater would be turned into fresh water by reverse osmosis, with two plants so the system stays N+1 if one is down. As an optional complement, leftover low-grade heat from the datacenter could drive a thermal desalination unit — for example a multi-effect distillation plant — in the same spirit as the waste-heat cascade already sketched. Rain collected off the dome would be a bonus, not the main supply. Storage tanks in the service segment would be sized toward the 30-day cutoff target, as a concept, not a calculated volume. Before the water is used, it would be polished with ultraviolet light and a chlorine residual.",
            },
            {
              title: "Wastewater",
              detail: "A compact membrane bioreactor, or MBR, would treat sewage on the island. Treated water could be reused for toilet flushing, irrigating the courtyard, and makeup water for the cooling loop. Only well-treated effluent would be discharged, at a point far from the oyster racks and the fish pen, and away from any intake for the unmanned pod basin. Leftover sludge would be dried, possibly with waste heat, and sent ashore on the train.",
            },
            {
              title: "Cooling water",
              detail: "The GPU cooling loop stays closed and separate, as already described in Heat: use it before it hits the sea. Seawater only touches heat exchangers. It never mixes with drinking water. The salty brine from reverse osmosis would be blended into the warm cooling discharge, so it dilutes and spreads instead of pooling. Temperature and salinity would be watched at the outfall, alongside the sensor ring already described for leftover heat.",
            },
          ]}
        />
      </Section>

      <Section heading="Why Japan fits" id="japan">
        <Text>
          Japan is already trying to put large datacenters where the clean power is, not only in Tokyo and Osaka. In June 2025, the Ministry of Economy, Trade and Industry and the Ministry of Internal Affairs and Communications published the first watt-bit policy report: a plan to build power lines and communications together, so computing can sit near decarbonized electricity.
        </Text>
        <Text>
          In September 2026, METI named the first GX Strategy Areas for datacenter clusters, with a goal of forming gigawatt-class sites over about ten years. The nine certified regions, with ten sites, are Hokkaido (Ishikari and Tomakomai), Akita, Miyagi (Tomiya), Tochigi (Yaita), Ibaraki (Joso and Tsukuba), Toyama (Nanto), Kagawa, Fukuoka (Kitakyushu, Nogata, and Kurate), and Kagoshima (Satsumasendai). Hokkaido and Kyushu are already busy with other announced projects. A sheltered bay in one of those regions is where this concept would try to live.
        </Text>
        <Text>
          A floating site would not take farmland, and it would not have to sit next to homes or a school. That matters. Rural towns have often welcomed the jobs and tax base, but local pushback in Japan has been about noise, heat, and secrecy when a campus is planned too close to daily life. In Kitakyushu, a large project planned beside an elementary school drew concerns about noise and sunlight and had its start delayed. In Tsukuba, residents have raised alarms about waste heat, noise, and water. A bay platform avoids some of those land conflicts. It still has to earn its place with fishing communities and coastal towns. A beautiful island that people might actually want to visit is part of that offer.
        </Text>
      </Section>

      <Section heading="Placement" id="placement">
          <Callout tone="info" lead="Still a concept.">
            Zone 7, the Tokachi–Kushiro Pacific coast, is the lead site for this thought experiment. It has not been surveyed, engineered, or permitted, and neither has any other zone. The notes below are a first look at coasts and bays, not a construction shortlist.
          </Callout>
          <Text>
            The preference, on weather grounds, is the Sea of Japan side rather than the Pacific. In general, that coast sees fewer typhoon landfalls and is less exposed to tsunamis from the Pacific trenches. Two strategic worries sit with that preference: Hokkaido is close to Russia, and the Sea of Japan is also the water where North Korean missile tests are often observed. The candidates below try to hold onto a sheltered site without pretending those concerns go away.
          </Text>
          <Image
            src="asset:sites-map.png"
            alt="Map of Japan showing first-look coasts for the Kaiyō DC concept: numbered markers for Ōmura Bay and the Imari area in northwest Kyushu, Ishikari Bay in Hokkaido flagged for strategic concerns, the Satsumasendai coast in Kagoshima, a pocket in Harima-nada off the Ieshima islands, Mutsu Bay in Aomori, labeled with Misawa Air Base (US/JASDF) and JMSDF Ōminato District, and zone 7, the lead site, an offshore stretch along the Tokachi–Kushiro Pacific coast of eastern Hokkaido, labeled as the lead site. Subsea cable landings and major cities are marked for context."
            caption="First-look coasts. Zone 7, the Tokachi–Kushiro Pacific coast, is the lead site for this thought experiment, not a surveyed or permitted mooring. Zones 1–3 are the bays named in the Placement notes. Ishikari Bay is flagged for the Russia and Sea of Japan concerns already noted in the text. Zone 4 is only a first look at a certified GX coastal site, not a surveyed bay. Zone 5 is a first-look pocket in Harima-nada, off the Ieshima islands, placed clear of the Himeji–Ieshima ferry routes. Zone 6 is Mutsu Bay, Aomori, an earlier pocket considered for the concept: an enclosed northern bay with colder water. The map labels Misawa Air Base (US/JASDF) and JMSDF Ōminato District as both a plus — heavily watched airspace and waters, and a quicker response — and a consideration: strategic sensitivity, possible airspace and security restrictions, and permitting with defense agencies. Other risks, including scallop aquaculture and heat, are in the Placement notes. Cable marks are existing or planned landing points, not a promised hookup. Coastline from Natural Earth, 10 m."
            ratio="1600 / 1495"
          />
          <Rows
            rows={[
              {
                title: "Ishikari Bay, Hokkaido",
                detail: "Cool air and water are a natural help for a compute site, and Sakura Internet already runs a large campus in the Ishikari Bay New Port area, using Hokkaido's outdoor air for cooling. Ishikari is also one of the official GX datacenter-cluster sites. The strategic concern is the location itself: northern Hokkaido sits close to Russia, and the bay faces the Sea of Japan.",
              },
              {
                title: "Northwest Kyushu, Ōmura and Imari",
                detail: "Ōmura Bay is a notably calm, enclosed water, and Imari sits close by. DayOne announced plans in October 2026 for a 200 MW datacenter campus in Imari, Saga, with first operations targeted for 2030. Northwest Kyushu is also near existing and planned international cable landings in Fukuoka, Kitakyushu, and Itoshima — not a landing in Imari itself, but a useful neighborhood for a shore fiber. Kyushu still sees some typhoons.",
              },
              {
                title: "The Seto Inland Sea",
                detail: "A sheltered inland sea, with milder waves than either open coast. It is also close to major shipyards, including Imabari Shipbuilding and the Kure yard of Japan Marine United, which would help if the island is built as towed modules. The trade-off is a busy waterway, with heavy shipping and fishing, so space and consent would be tight. That general concern still stands. A more specific first-look pocket in that sea is noted next.",
              },
              {
                title: "Harima-nada, off the Ieshima islands",
                detail: "A more specific first-look pocket in the eastern Seto Inland Sea, off Himeji and the Ieshima islands. The shelter and the nearby shipyards are the same reasons the Seto was looked at in the first place. This pocket is placed deliberately clear of the Himeji–Ieshima ferry routes. Shipping lanes and fisheries still need checking, and the wider inland sea remains a busy waterway. This is not a surveyed or permitted site.",
              },
              {
                title: "Mutsu Bay, Aomori",
                detail: "An earlier pocket considered for the concept. Mutsu Bay is an enclosed northern bay that opens north through the Tairadate Strait into the Tsugaru Strait. The water is generally colder than at more southerly coasts, which would help with cooling — an average, not a guarantee, because summer heat events already happen here. The bay is a major scallop-aquaculture area. Aomori is Japan's second-largest scallop-producing prefecture, after Hokkaido, so fisheries rights and warm discharge are central issues. Scallops are sensitive to high water temperatures: the Aomori Prefectural Industrial Technology Research Center's Fisheries Institute says fry growth slows above about 23°C, with a serious risk of weakening and death above about 26°C. Asahi Shimbun, citing that institute, reported that in summer 2023 the bay stayed above 23°C for about 50 days at 15 m depth, with more than half of the juvenile scallops dying across the bay, and higher losses in some local areas. A November 2023 survey reported by Daily Tohoku found about 30–40% of sampled farmed scallops dead in Mutsu City. Because the bay exchanges water with the Tsugaru Strait mainly through the relatively narrow Tairadate mouth, leftover heat can linger more than it would on an open coast. That is a first-look concern, not a modeled thermal budget. Winter on this coast is snowy and windy. Aomori City, on the south shore, is known for heavy snowfall, and the prefecture notes winter wind waves inside the bay. Regular sea ice is not assumed: published winter water temperatures in the bay are typically a few degrees above freezing. Earthquake and tsunami exposure should be taken seriously, with a hedge. The Pacific coast of Aomori has a history of major tsunamis from offshore earthquakes. Aomori Prefecture's disaster plan says tsunamis have been recorded on the Mutsu Bay shore, but that none have caused major damage there. Aomori City still maps possible inundation from a Japan Trench megaquake, and from a local fault. A floating site in the bay is not automatically safe from a Pacific-side event. The neighborhood is also a strategic one. Misawa Air Base, on the Pacific side of the prefecture at Misawa City, is a joint United States and Japan Air Self-Defense Force operational air base; JASDF describes it as its only such joint-use combat air base. The JMSDF Ōminato District headquarters sits on Mutsu Bay itself, near Ōminato Port in Mutsu City. Those facilities mean heavily watched and protected airspace and waters, and a quicker response. They are also a consideration: strategic sensitivity, possible airspace and security restrictions, and permitting that would have to involve defense agencies. Japan Nuclear Fuel's Rokkasho nuclear fuel-cycle facilities are nearby, but on the Pacific side of the Shimokita Peninsula, not on the bay itself. North Korean ballistic missiles have flown over Tohoku, including a 4 October 2022 launch that Japan's Ministry of Defense said passed over Aomori Prefecture before falling in the Pacific. That is a geopolitical risk. An overflight is not evidence of low accuracy, and it is not a claim that the bay is safe. This is a first-look pocket, not a surveyed or permitted site.",
              },
              {
                title: "Tokachi–Kushiro Pacific coast, eastern Hokkaido — lead site",
                detail: "The lead site for this thought experiment, not a surveyed, engineered, or permitted location. The lead site is an offshore stretch from roughly south of Obihiro and the Tokachi coast east past Kushiro. The main attraction is cooling: the cold Oyashio current runs along this coast, so the water is generally the coldest of the zones on this map, and the open sea can disperse leftover heat more readily than an enclosed bay. That is a first-look comparison, not a measured site study, and Oyashio conditions vary from year to year — a 2022–23 marine heatwave was reported in the Oyashio region when warmer water pushed in. The coast also faces the open Pacific, away from the Sea of Japan and the usual tracks of North Korean missile tests, and Kushiro is a major fishing port that could serve a platform. The intended siting, still a first look, is just off the shallow shelf, in deeper water where the slope drops, so the platform can sit in deeper water without going far from shore. Published bathymetry of this margin describes a shelf on the order of 20–30 km wide, typically to about 80–140 m, then a drop toward the Kuril, or Chishima, Trench slope. The shelf edge is steeper east of Kushiro Canyon than on the Tokachi side, where the transition is more gradual. A site just beyond the break would still be tens of kilometers offshore. That is a geographic sketch, not a chosen depth or a surveyed mooring. Because this is an open-Pacific coast with swells, and because tsunami currents on this trench are a real risk, the mooring concept here is mostly compliant rather than stiff. The sketch uses chain and polyester lines, with adjustability and heave compensation, instead of stiff tension-leg tethers that would fight a strong current. Power, fiber, and any later tunnel connection would use flexible or breakaway couplings, so an extreme excursion is meant to part a designed weak link rather than tear the platform or the shore works. The export would be a dynamic riser, the usual approach for a floater that moves, and the plan is two cable landings at separate points. These are concept choices, not a designed mooring or a cable route. The seismic trade-off is serious. This coast sits above the Kuril, or Chishima, Trench. The 26 September 2003 Tokachi-oki earthquake was a plate-boundary megathrust; the Japan Meteorological Agency gave it magnitude 8.0, and other estimates put the moment magnitude around 8.3. A tsunami of 255 cm was recorded at Tokachi Port in Hiroo, with run-up above 4 m in some places. Japan's Earthquake Research Committee continues to publish long-term probabilities for this trench: as of its 2026 update, a Tokachi-oki earthquake of about M8.0–8.6 has a roughly 20% chance within 30 years, a Nemuro-oki event of about M7.8–8.5 is given a roughly 90% chance within 30 years, and a rarer 17th-century-type super-huge earthquake of about M8.8 or greater is given a 7–40% chance within 30 years. Those are official probability estimates, updated as time passes without an event, not a forecast of a particular year. Sea fog is common on this coast, especially in spring and summer — Kushiro is often described as seeing on the order of 100 foggy days a year. Drift ice is not an every-year feature on the Pacific side the way it is in the Sea of Okhotsk; JMA coastal sea-ice records for Kushiro, which begin in 1946, show ice in only some winters. Local summaries of those records count 29 seasons through 2025, most recently in 2017, typically in late winter when ice drifts out through the Nemuro Strait, and more often toward the east. Past Kushiro, the coast continues toward Nemuro, and beyond that lie the Russian-held southern Kuril Islands, which Japan calls the Northern Territories. This zone is not on that frontier, but the neighborhood is a geopolitical one. Fisheries are a core local industry: Alaska pollock is a mainstay at Kushiro, and salmon, sardines, Pacific saury, shishamo smelt, kelp, and other species are also landed. Consent from fishing communities would be essential.",
              },
            ]}
          />
          <Text>
            Every site has trade-offs. The choice is which problems to solve — heat versus storms, fisheries, or geopolitics — not whether a perfect coast exists. The Japanese sites on this page are examples. The concept itself is location-agnostic. The Gulf of Mexico, for instance, already has a large offshore industry, but it also has hurricanes and warm water.
          </Text>
        </Section>

        <Section heading="Sea vs. space" id="sea-vs-space">
        <Text>
          Orbital datacenters are the other big "put the computers somewhere else" pitch. Starcloud, a Redmond, Washington company, argues that orbit offers nearly continuous sunlight and radiative cooling. It says Starcloud-1 launched in November 2025 with the first NVIDIA H100 GPU in space, and it plans a first commercial mission, Starcloud-2, in sun-synchronous orbit by 2027. Elon Musk has said SpaceX will pursue the idea by scaling up Starlink V3 satellites, and has described a planned AI satellite constellation called Starmind. Those are real pitches, and in Starcloud's case a small demo satellite, not a gigawatt orbital plant. The comparison below is about the physics and the access, not a verdict.
        </Text>
        <Table
          columns={["", "Kaiyō DC, at sea", "Orbital datacenters, as pitched"]}
          rows={[
            [
              "Cooling",
              "Seawater can carry heat away by convection around the pods.",
              "In vacuum there is no air or water to convect. Heat has to leave as infrared radiation from large radiators.",
            ],
            [
              "Power",
              "A flush solar-tiled ring, semi-transparent solar glass over the courtyard, wave energy converters on the outer edge, battery storage, and a shore-grid cable. An SMR, if ever added, would be a later baseload module.",
              "Proponents point to stronger sunlight with no atmosphere and, in the right orbit, little or no night, so they argue for smaller batteries. Starcloud and Musk both make this case.",
            ],
            [
              "Latency and links",
              "A subsea fiber to shore, like a normal coastal datacenter, with a backup landing.",
              "No fiber. Data has to go by radio or laser to the ground, plus the trip to and from orbit. Starcloud also pitches processing Earth-observation data in space, where the data is already collected.",
            ],
            [
              "Maintenance",
              "Crew can cross the bridge to the central hub, ride the elevators down through the observation level to the pod rings, or crane a whole pod at the service bay, away from the garden.",
              "There is no walk-up repair. A failed box is typically replaced only when you can launch again.",
            ],
            [
              "Build and launch cost",
              "Modules would be built in shipyards and towed into place. That is still expensive marine engineering, but it uses an industry that already exists. No dollar figure is offered here.",
              "Every kilogram has to be launched. Proponents say falling launch costs, including a reusable Starship, could make this economical. Critics say the launch bill and the radiators are still easy to underestimate. No dollar figure is offered here either.",
            ],
            [
              "Technology readiness",
              "Underwater and floating compute already have tests and, in China's Hainan project, early commercial use. A kilometer-scale hybrid island with a manned shaft is still a concept.",
              "Starcloud-1 is a small demo satellite. Large orbital datacenters, including SpaceX's Starmind, remain a plan or a pitch.",
            ],
          ]}
        />
      </Section>

      <Section heading="Kaiyō vs Starmind" id="starmind">
        <Callout tone="info" lead="A comparison of a concept and a published plan.">
          Kaiyō DC is still a thought experiment. SpaceX's Starmind / AI1 program is a public design, factory, and regulatory plan, not a flying datacenter. Official figures have already changed once. Talk, aspirational targets, and scaling cases are labeled as such. No dollar figures are offered here.
        </Callout>
        <Text>
          The Sea vs. space section above is a general physics comparison, including Starcloud. This section zooms in on what SpaceX, and later NVIDIA, have actually published about Starmind as of November 2026.
        </Text>
        <Text>
          How Starmind is supposed to work, in plain language. Each AI1 satellite is essentially one rack of compute, wrapped in solar arrays, liquid radiators, and laser links, and flown in sun-synchronous orbit so the arrays stay in sunlight almost all the time. SpaceX says a lot of the solar and thermal technology already exists on Starlink V3, and that an AI satellite is simpler than a Starlink broadband satellite because it does not need the same complex antennas.
        </Text>
        <Text>
          Power. Official, June 8, 2026 IPO video: a draft "version one" start point of 150 kW peak and 120 kW sustained, with design assumptions of 250 W/m² for the solar array and about 1,400 W/m² for double-sided radiators flown knife-edge to the Sun. Dan Huot gave a wingspan of about 70 meters. Official later updates raised the power target. On July 16, 2026, Musk said the V1 peak spec had been raised to about 250 kW, battery-assisted, with an average of about 160 kW. As of November 17, 2026, SpaceX's Starmind page lists a 30 m deployed height, a 75 m wingspan, up to 250 kW peak and 175 kW average, and 75 kW per ton. A November 10, 2026 SpaceX and SINGULUS announcement is about factory solar-cell equipment — "more than 100 GW of equipment" — not in-orbit compute. Musk's same-day post called it "100 GW/year" of heterojunction equipment; that is his wording, not a flown capacity.
        </Text>
        <Text>
          Cooling. There is no air or seawater in orbit. Heat is pumped to deployable liquid radiators and thrown off as infrared into the vacuum of space. SpaceX's page says this can cut cooling-power overhead by an order of magnitude versus terrestrial chillers. That is not the same as "space is cold, so the chips stay cool by themselves." An uncooled box in vacuum overheats.
        </Text>
        <Text>
          Networking. Official, June 8 video: laser connectivity "on the order of a terabit," with racks linking to each other or into the Starlink constellation, which then sends data to the ground on existing Ka and Ku antennas. The January 30, 2026 FCC application says communications are nearly all optical, into Starlink's "petabit" laser mesh, with Ka-band radio only as a non-interference backup for telemetry, tracking, and command. Treat later informal talk of much higher per-satellite throughput as unconfirmed for AI1.
        </Text>
        <Text>
          Servicing. No official SpaceX design for swapping GPU modules in orbit is in the public materials reviewed for this page. The FCC narrative stresses little operating or maintenance cost, low-altitude checkout so early failures deorbit, and end-of-life re-entry or disposal orbits, with only a possible future look at hardware recycling. The published model is: mass-produce, launch, run, replace the whole satellite, then dispose of it. Compute is modular at build time. The June 8 video gave reference designs for NVIDIA Rubin or GB300 chips, plus a TPU design, and said existing chips can be put into orbit. In August 2026, SpaceX and NVIDIA said the first-generation Starmind satellite would be based on a space-optimized Vera Rubin NVL72. Musk also said the same Starmind V1 compute design, minus the solar arrays and radiator, would be used in ground data centers.
        </Text>
        <Text>
          Timeline, as published, not as a promise. The June 12, 2026 IPO prospectus says SpaceX expects to begin deploying orbital AI compute satellites as early as 2028. CFO Bret Johnsen said the company could fly "pieces" of these satellites in 2027, start flying in 2028 if it stays on target, and have "meaningful amounts of compute in space" in 2029. The Starmind page says the Gigasat factory in Bastrop is planned to enable production of thousands of AI satellites starting as soon as late 2027. On August 24, 2026, Musk said a space-optimized Vera Rubin NVL72 was designed for launch to orbit in the fourth quarter of 2027, with significant scale in 2028. The prospectus also describes a scaling case — 100 gigawatts per year at over 100 kW of compute per metric ton, needing thousands of launches and about one million metric tons to orbit annually — as a Starship-dependent requirement, not a committed production schedule. Musk's June 8 aspirational cadence, including a gigawatt-per-year rate by the end of 2027, was explicitly "not a promise."
        </Text>
        <Table
          columns={["", "Kaiyō DC", "SpaceX Starmind / AI1"]}
          rows={[
            [
              "Power",
              "A flush solar-tiled ring, semi-transparent solar glass, wave converters, battery storage, and a shore-grid cable. An SMR, if ever added, would be a later baseload module. Night, clouds, and typhoons are part of the problem.",
              "Official page, November 2026: up to 250 kW peak and 175 kW average per satellite from solar in sun-synchronous orbit, with 75 kW/ton. Earlier official video: 150 kW peak and 120 kW sustained. Musk, later: about 250 kW peak, battery-assisted. Less need for huge batteries is the pitch, not a measured result.",
            ],
            [
              "Cooling",
              "Closed deionized-water GPU loops, then heat exchangers into seawater around the pods, with an optional deep intake.",
              "Official: deployable liquid radiators reject heat as infrared into vacuum. Double-sided, knife-edge to the Sun, at about 1,400 W/m² in the June 2026 design assumptions.",
            ],
            [
              "Networking and backhaul",
              "A subsea fiber to shore, with a backup landing, and Starlink as a further backup in this concept.",
              "Official: optical inter-satellite links as the main path, into Starlink, then to Earth. June 2026 video: on the order of a terabit. Ka-band radio is a TT&C backup only, per the FCC application.",
            ],
            [
              "Servicing",
              "Crew can cross the bridge, ride the hub elevators into the pod rings, or crane a whole pod at the service bay.",
              "No official on-orbit module-swap design found. The published model is replace the whole satellite and dispose of it at end of life.",
            ],
            [
              "Compute modularity",
              "Standard, repeatable GPU pods, installed last, after the surface, power, and cooling are up. A failed pod can be isolated or unhooked.",
              "Official: vendor-agnostic compute modules; June 2026 reference designs for NVIDIA or TPU chips; later official pairing with a space-optimized Vera Rubin NVL72. The same compute design, minus solar and radiator, is also meant for ground data centers.",
            ],
            [
              "Heat use",
              "Reuse first: desalination, the forest, hub heating, a sento and pools, and possibly aquaculture. Leftover heat goes out through deep diffusers, watched by a sensor ring.",
              "Waste heat is radiated to space. There is no reuse cascade in the public design.",
            ],
            [
              "Timeline and status",
              "A thought experiment. Nothing has been engineered, permitted, or costed.",
              "A published program: FCC application filed January 30, 2026, accepted for comment, not authorized to fly. Prospectus: deploy as early as 2028. Company targets: factory output and first launch as soon as late 2027, with significant scale talked about for 2028–2029. Not yet a flying datacenter.",
            ],
          ]}
        />
        <Text>
          Ideas worth borrowing for Kaiyō, without copying the orbital constraints.
        </Text>
        <BulletList
          items={[
            "One standard compute brick, chip-vendor agnostic, sized like a single rack, so the same module can sit in a submerged pod or in the dry hub — the way SpaceX describes using the same Starmind compute design on the ground, minus solar and radiator.",
            "Install compute last, after the torus, power, and cooling are up.",
            "Swap-not-repair at the module level. SpaceX does this by replacing whole satellites. Kaiyō can pull a pod with a ship, a crane, or an ROV.",
            "An optical or fiber mesh inside the island, with Starlink only as backup to subsea fiber — lasers first, radio last.",
            "Redundant closed liquid cooling loops as a core module standard, rejecting or reusing heat through exchangers into seawater, not into space.",
            "A handful of shipyard-standard module types, made in high repetition, plus software that shifts workloads as solar, wave, and tidal output changes.",
          ]}
        />
        <Text>
          What Kaiyō can do better, if the concept were ever built. It can reuse waste heat on the island instead of throwing it into space. People and ships can install GPUs last and swap failed pods, without launching a replacement satellite. Seawater moves far more heat per square meter than a vacuum radiator, though discharge limits still have to be proven. Commercial GPUs do not need space qualification. And subsea fiber is a better primary backhaul for bulky training traffic than a laser hop through Starlink to a dish.
        </Text>
        <Text>
          Official Starmind sources, checked in November 2026.
        </Text>
        <LinkCards
          links={[
            { title: "SpaceX: Starmind / AI1 official page", site: "spacex.com", href: "https://www.spacex.com/spacexai/starmind" },
            { title: "SpaceX: technical update on manufacturing, launching, and operating AI satellites at scale", site: "x.com", date: "Jun 8, 2026", href: "https://x.com/SpaceX/status/2064099405758906727" },
            { title: "SEC free writing prospectus: official transcripts of the June 8 Musk/Dahl and Johnsen videos", site: "sec.gov", date: "Jun 8, 2026", href: "https://www.sec.gov/Archives/edgar/data/1181412/000162828026041761/fwp_cfointerview.htm" },
            { title: "Gavin Baker interview of SpaceX CFO Bret Johnsen, as noted in the same prospectus", site: "x.com", date: "Jun 8, 2026", href: "https://x.com/gavinsbaker/status/2064131659939950943" },
            { title: "FCC: SpaceX Orbital Data Center System application, ICFS File No. SAT-LOA-20260108-00016, Call Sign S00798", site: "fcc.gov", date: "Jan 30, 2026", href: "https://fccprod.servicenowservices.com/icfs?id=ibfs_application_summary&number=SAT-LOA-20260108-00016" },
            { title: "SpaceX FCC narrative: Application for Launch and Operating Authority for the Orbital Data Center System", site: "regmedia.co.uk", date: "Jan 30, 2026", href: "https://regmedia.co.uk/2026/02/05/spacex-orbital-dc-sat-narrative.pdf" },
            { title: "FCC Public Notice DA 26-113: application accepted for filing, not authorized to fly", site: "fcc.gov", date: "Feb 4, 2026", href: "https://docs.fcc.gov/public/attachments/DA-26-113A1.pdf" },
            { title: "SpaceX Form 424B4 IPO prospectus, including the as-early-as-2028 orbital compute glossary", site: "sec.gov", date: "Jun 12, 2026", href: "https://www.sec.gov/Archives/edgar/data/1181412/000162828026042639/spaceexplorationtechnologi.htm" },
            { title: "SpaceX: Starmind AI1 payload partnership with NVIDIA", site: "x.com", date: "Aug 4, 2026", href: "https://x.com/SpaceX/status/2084723854534951218" },
            { title: "Musk: same Starmind V1 compute design, minus solar and radiator, for ground data centers", site: "x.com", date: "Aug 4, 2026", href: "https://x.com/elonmusk/status/2084733538591486349" },
            { title: "Musk: V1 peak raised to about 250 kW, battery-assisted, average about 160 kW", site: "x.com", date: "Jul 16, 2026", href: "https://x.com/elonmusk/status/2077626509615829213" },
            { title: "Musk: space-optimized Vera Rubin NVL72, launch in Q4 2027, significant scale in 2028", site: "x.com", date: "Aug 24, 2026", href: "https://x.com/elonmusk/status/2091939113008238838" },
            { title: "NVIDIA: first-generation Starmind satellite based on an optimized Vera Rubin NVL72", site: "nvidia.com", date: "Aug 24, 2026", href: "https://nvidianews.nvidia.com/news/spacexai-adopts-nvidia-vera-cpu-to-accelerate-agentic-ai-at-massive-scale" },
            { title: "SpaceX: SINGULUS contract for Starmind solar-cell manufacturing equipment in Bastrop", site: "x.com", date: "Nov 10, 2026", href: "https://x.com/SpaceX/status/2120231065394590007" },
            { title: "SINGULUS: SpaceX heterojunction solar-cell equipment contract, first line in H1 2027", site: "singulus.com", date: "Nov 10, 2026", href: "https://www.singulus.com/2026/11/10/spacex-heterojunction-solar-cells-singulus/" },
          ]}
        />
      </Section>

      <Section heading="Precedents" id="precedents">
        <Text>
          None of these is Kaiyō DC. Together they show that the pieces have been tried, at very different scales.
        </Text>
        <Rows
          rows={[
            {
              title: "Mega-Float, Tokyo Bay",
              detail: "In 2000, Japan built a 1,000 m by 121 m floating runway model in Tokyo Bay, with a narrower stretch of 60 m, from units constructed and joined offshore. Aircraft took off and landed, and a transport ministry committee later judged a much larger floating airport to be feasible. That is the closest cousin to a modular Japanese sea platform.",
            },
            {
              title: "Floating solar in Japan",
              detail: "Japan already puts solar on water. Kyocera TCL Solar's 13.7 MW plant on the Yamakura Dam reservoir in Chiba began operation on March 5, 2018, and was then the country's largest floating solar farm. Reservoir and pond projects have continued since, including municipal plants in Hirakata, Osaka.",
            },
            {
              title: "Project Natick, Orkney",
              detail: "Microsoft's Phase 2 module, Northern Isles, sat on the seafloor off Scotland from June 2018 to July 2020. It was a sealed, no-access vessel. Microsoft reported a server failure rate one-eighth that of a land-based control group.",
            },
            {
              title: "Highlander, off Hainan",
              detail: "HaiLanYun, part of the Highlander group, has operated a commercial underwater datacenter off Lingshui, Hainan, since early 2023. A Chinese government English report dated February 19, 2025, said operations began at the end of March 2023 and that a new seabed module had just been added to form a cluster. It uses sealed modules and seawater cooling. That is a commercial underwater precedent, not a Japanese one, and the performance claims around it are the operator's and state media's, not independently audited here.",
            },
            {
              title: "Floating datacenter work in Japan, 2026",
              detail: "On March 25, 2026, NYK Line, NTT Facilities, Eurus Energy, MUFG Bank, and the City of Yokohama started a demonstration on a mini-float at Osanbashi Pier: a container datacenter with solar and batteries, running on renewable power, to test salt and vibration through the end of fiscal 2026. On March 30, 2026, MOL, Hitachi, and Hitachi Systems signed a memorandum to study converting used ships into floating datacenters, with a view to operations in 2027 or later. Those are demos and plans, not a kilometer-scale island.",
            },
            {
              title: "Akademik Lomonosov, Pevek",
              detail: "The Russian floating nuclear plant entered commercial operation on May 22, 2020. It is the clearest precedent for nuclear power on a floating hull, and a different reactor design from the Aalo Pod discussed above.",
            },
            {
              title: "Biosphere 2, Oracle, Arizona",
              detail: "A large sealed glass enclosure whose construction began in 1986. Two missions, between 1991 and 1994, sealed crews inside. The University of Arizona has owned the facility since July 2011. It is a land precedent for a glazed biosphere, not a marine one, and it is the comparison behind Layout B.",
            },
            {
              title: "The Eden Project, Cornwall",
              detail: "Opened on March 17, 2001. Grimshaw Architects designed the Rainforest and Mediterranean biomes as joined domes. It is a land conservatory and visitor attraction, not a sealed closed ecosystem and not a marine structure, and it is the other comparison behind Layout B.",
            },
          ]}
        />
      </Section>

      <Section heading="Open challenges" id="challenges">
        <Text>
          This is the hard list, and it is why the idea stays a concept until each item has a real answer.
        </Text>
        <BulletList
          items={[
            { text: "Typhoons and tsunamis.", items: ["A flush solar-tiled roof keeps the wind profile low, the outer wave converters act as a breakwater, and the inner courtyard stays calmer than the open sea. The ring can flex at its joints, and the computers stay below. This still has to be shown to survive a real storm, not just a sketch."] },
            { text: "Salt, soiling, and heat on the solar deck.", items: ["Flat tiles will need a cleaning plan for salt spray and dirt, and a dark flush surface will run hot. The Yokohama demo is already a reminder that salt air and spray will also attack the crane, the shaft seals, and every cable gland."] },
            { text: "Earthquakes.", items: ["A floating island is less tied to shaking ground than a building on fill, which is one reason Japan studied Mega-Float. Moorings, umbilicals, and the shore landings still have to ride it out."] },
            { text: "The central core and the stacked rings.", items: ["The elevator hub is a leak point, a structural spine, and a humidity problem, and it caps how deep the rings can go. The bottom-ring tubes add more penetrations to the seabed."] },
            { text: "Cost.", items: ["Shipyard modules, subsea cables, a manned shaft, and marine crews are expensive. No estimate is offered here because none has been built for this." ] },
            { text: "Permits and fishing rights.", items: ["A bay is already someone's workplace. Coastal use, cables, and heat in the water all need consent, not just a national zoning map." ] },
            { text: "Maintenance access.", items: ["The central elevators and the service-segment crane are the planned answers, with heavy lifts kept off the visitor garden. Weather, sea state, and spare-parts logistics will still decide whether a repair happens on time." ] },
            { text: "A later sodium-cooled reactor, if it is ever attempted.", items: ["Liquid sodium and seawater are a bad combination. Japan would also have to clear NRA licensing and local consent. That is a long-horizon question, not a first-phase one." ] },
          ]}
        />
      </Section>

      <Divider />

      <Section heading="Sources" id="sources">
        <Text>
          Links below were checked in November 2026. Company roadmaps and unpublished performance claims are labeled as such in the text.
        </Text>
        <LinkCards
          links={[
            { title: "METI: first GX Strategy Areas, including nine datacenter-cluster regions", site: "meti.go.jp", date: "Sep 11, 2026", href: "https://www.meti.go.jp/press/2026/09/20260911006.html" },
            { title: "METI and MIC: Watt-bit public-private report 1.0", site: "meti.go.jp", date: "Jun 12, 2025", href: "https://www.meti.go.jp/press/2025/06/20250612001/20250612001.html" },
            { title: "MLIT: Mega-Float airport model in Tokyo Bay", site: "mlit.go.jp", href: "https://www.mlit.go.jp/english/maritime/mega_float.html" },
            { title: "Kyocera: Yamakura Dam 13.7 MW floating solar plant opens", site: "kyocera.com", date: "Mar 27, 2018", href: "https://uk.kyocera.com/news/2018/03/27155110.html" },
            { title: "Microsoft Research: Project Natick overview", site: "microsoft.com", href: "https://www.microsoft.com/en-us/research/project/natick/overview/" },
            { title: "Microsoft: Natick retrieval and results", site: "microsoft.com", date: "Sep 14, 2020", href: "https://news.microsoft.com/source/features/sustainability/project-natick-underwater-datacenter/" },
            { title: "Xinhua via official government English site: Hainan underwater computing cluster", site: "www.gov.cn", date: "Feb 19, 2025", href: "https://english.www.gov.cn/news/202502/19/content_WS67b5a14dc6d0868f4e8efcaa.html" },
            { title: "NYK Line: Yokohama floating green datacenter MoU", site: "nyk.com", date: "Mar 27, 2025", href: "https://www.nyk.com/english/news/2025/20250327_03.html" },
            { title: "NYK Line: Yokohama demonstration begins", site: "nyk.com", date: "Mar 25, 2026", href: "https://www.nyk.com/news/2026/20260325_02.html" },
            { title: "MOL and Hitachi: used-ship floating datacenter MoU", site: "mol.co.jp", date: "Mar 30, 2026", href: "https://www.mol.co.jp/en/pr/2026/26021.html" },
            { title: "Japan Times: datacenter backlash in Japan and the U.S.", site: "japantimes.co.jp", date: "Nov 11, 2026", href: "https://www.japantimes.co.jp/news/2026/11/11/japan/society/data-center-backlash-japan-us-election/" },
            { title: "CATL: Naxtra sodium-ion battery announced", site: "catl.com", date: "Apr 21, 2025", href: "https://www.catl.com/en/news/6401.html" },
            { title: "CATL: Naxtra reaches GWh-scale industrialization", site: "catl.com", date: "Apr 21, 2026", href: "https://www.catl.com/en/news/6811.html" },
            { title: "UNIST: seawater battery research", site: "eurekalert.org", date: "Feb 8, 2017", href: "https://www.eurekalert.org/news-releases/904899" },
            { title: "Sakura Internet: Ishikari Data Center", site: "sakura.ad.jp", href: "https://datacenter.sakura.ad.jp/location/ishikari/" },
            { title: "DayOne: planned Imari, Saga datacenter campus", site: "dayonedc.com", date: "Oct 2, 2026", href: "https://dayonedc.com/markets/dayone-announces-plans-for-new-data-center-development-in-kyushu-japan" },
            { title: "SoftBank: planned E2A cable landings at Tomakomai and Itoshima", site: "softbank.jp", date: "Jul 4, 2025", href: "https://www.softbank.jp/corp/news/press/sbkk/2025/20250704_01/" },
            { title: "Aalo Atomics: Aalo Pod technology specs", site: "aalo.com", href: "https://www.aalo.com/technology" },
            { title: "Aalo Atomics: announcing the Aalo Pod, including footprint and N+1 claims", site: "aalo.com", date: "Apr 7, 2025", href: "https://www.aalo.com/post/announcing-the-aalo-pod" },
            { title: "Rosenergoatom: Akademik Lomonosov enters commercial operation", site: "rosenergoatom.ru", date: "May 22, 2020", href: "https://www.rosenergoatom.ru/en/for-journalists/highlights/35050/" },
            { title: "Starcloud-1", site: "starcloud.com", href: "https://www.starcloud.com/starcloud-1" },
            { title: "Starcloud-2 plan", site: "starcloud.com", href: "https://www.starcloud.com/starcloud-2" },
            { title: "Ars Technica: Musk on orbital datacenters", site: "arstechnica.com", date: "Oct 2025", href: "https://arstechnica.com/space/2025/10/elon-musk-on-data-centers-in-orbit-spacex-will-be-doing-this/" },
            { title: "Biosphere 2: about the facility", site: "biosphere2.org", href: "https://biosphere2.org/about/about-biosphere-2" },
            { title: "Eden Project: biome architecture", site: "edenproject.com", href: "https://www.edenproject.com/about-us/architecture" },
            { title: "Eden Project: origins, including the March 17, 2001 opening", site: "edenproject.com", href: "https://www.edenproject.com/node/147/our-origins" },
            { title: "Microsoft Research podcast: Ben Cutler on Natick discharge warming", site: "microsoft.com", date: "Sep 5, 2018", href: "https://www.microsoft.com/en-us/research/podcast/putting-the-cloud-under-the-sea-with-ben-cutler/" },
            { title: "Ministry of the Environment: legal definition of onsen under the Hot Spring Act", site: "env.go.jp", href: "https://www.env.go.jp/nature/onsen/point/" },
            { title: "World Nuclear Association: molten salt reactors, including TMSR-LF1 full power and October 2024 thorium addition", site: "world-nuclear.org", href: "https://world-nuclear.org/information-library/nuclear-power-reactors/other/molten-salt-reactors" },
            { title: "Nuclear Engineering International: China refuels thorium molten-salt reactor without shutdown", site: "neimagazine.com", href: "https://www.neimagazine.com/news/china-refuels-thorium-reactor-without-shutdown/" },
            { title: "Copenhagen Atomics: container-size thorium molten-salt reactor technology, in development", site: "copenhagenatomics.com", href: "https://copenhagenatomics.com/technology/" },
            { title: "Norwegian Public Roads Administration research context: submerged floating tunnels for wide, deep fjords", site: "sciencedirect.com", date: "2010", href: "https://www.sciencedirect.com/science/article/pii/S1877705810030300" },
            { title: "Tokyo Bay Aqua-Line: official construction overview of the undersea highway", site: "aqua-line.co.jp", href: "https://www.aqua-line.co.jp/aqualine/" },
            { title: "Business Insider: xAI Colossus GPU count and Memphis grid-power requests", site: "businessinsider.com", date: "Apr 2025", href: "https://www.businessinsider.com/elon-musk-xai-data-center-colossus-power-memphis-2025-4" },
            { title: "Kindai University Fisheries Laboratory: tuna aquaculture research", site: "flku.jp", href: "https://www.flku.jp/english/" },
            { title: "Polar Night Energy: first commercial sand battery in Kankaanpää, including 200 kW / 8 MWh and data-server waste-heat priming", site: "polarnightenergy.com", href: "https://polarnightenergy.com/reference/worlds-first-sand-battery/" },
            { title: "Polar Night Energy: what a sand battery is, including the June 2025 Pornainen 1 MW / 100 MWh unit", site: "polarnightenergy.com", href: "https://polarnightenergy.com/news/what-is-a-sand-battery/" },
          ]}
        />
      </Section>

      <Floating edge="bottom" align="end">
        <BackToTop />
      </Floating>
    </Page>
  );
}
