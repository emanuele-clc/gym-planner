import { Level } from '../models/exercise.model';

/** Nome e nota (facoltativa) di una variante. */
export type VariantText = readonly [name: string, note?: string];

export interface ExerciseText {
  name: string;
  cues: string[];
  variants: Record<Level, VariantText>;
}

const e = (
  name: string,
  cues: string[],
  base: VariantText,
  intermedio: VariantText,
  avanzato: VariantText,
): ExerciseText => ({ name, cues, variants: { base, intermedio, avanzato } });

/** Stesso nome e nota per tutti e tre i livelli. */
const same = (name: string, cues: string[], v: VariantText): ExerciseText => e(name, cues, v, v, v);

/** Esercizi con elastico: il livello cambia solo la resistenza dell'elastico. */
const band = (name: string, cues: string[], note?: string): ExerciseText =>
  e(
    name,
    cues,
    [`${name} (light band)`, note],
    [`${name} (medium band)`, note],
    [`${name} (heavy band)`, note],
  );

const WEIGHTED = 'Weighted backpack.';
const FEET_ON_CHAIR = 'Feet on a chair.';
const BAND_ANCHORED = 'The image shows a cable: use a band anchored to a fixed point.';
const BAND_STAND = 'The image shows a cable: stand on the band.';
const TABLE_ROW = 'The image shows a bar: use the edge of the table.';
const PACK_DUMBBELLS = 'The image shows dumbbells: use a loaded backpack.';
const PACK_DUMBBELL = 'The image shows a dumbbell: use a backpack.';
const PACK_CURL = 'The image shows a dumbbell: hold the backpack by its handles.';
const FLOOR_GHR = 'Hook your feet under a heavy piece of furniture or a sofa.';

export const EXERCISES_EN: Record<string, ExerciseText> = {
  // ---------- Corpo libero ----------
  dip: e(
    'Dip',
    [
      'Shoulders away from your ears',
      'Elbows close to your torso',
      'Lower until your shoulders are level with your elbows',
    ],
    ['Chair dip'],
    ['Parallel bar dip'],
    ['Weighted dip', 'Weighted backpack. Same movement as on the parallel bars.'],
  ),
  'pike-pushup': e(
    'Pike push-up',
    [
      'Hips high, body in an inverted V',
      'Head between your arms',
      'Lower your head toward the floor, between your hands',
    ],
    ['Pike push-up'],
    ['Feet-elevated pike push-up', 'Feet on a chair or a step.'],
    ['Wall handstand push-up'],
  ),
  'pushup-declinato': e(
    'Push-up: chest and shoulders',
    [
      'Body in a straight line, glutes squeezed',
      'Elbows at about 45° from your torso',
      'Chest a fist away from the floor',
    ],
    ['Incline push-up', 'Hands on a raised surface.'],
    ['Decline push-up', FEET_ON_CHAIR],
    ['Plyometric push-up'],
  ),
  diamond: e(
    'Diamond push-up',
    [
      'Hands under your chest, index fingers and thumbs touching',
      'Elbows close to your ribs',
      'Push until your elbows lock out',
    ],
    ['Incline diamond push-up'],
    ['Diamond push-up'],
    ['Feet-elevated diamond push-up', FEET_ON_CHAIR],
  ),
  plank: e(
    'Plank',
    [
      'Elbows under your shoulders',
      'Glutes and abs tight',
      'Hips in line with shoulders and ankles',
    ],
    ['Plank'],
    ['Plank'],
    ['Push-up to side plank'],
  ),
  pullup: e(
    'Pull-up',
    [
      'Start from straight arms, shoulders down',
      'Bring your chest toward the bar',
      'Lower in 2-3" without bouncing',
    ],
    ['Negative pull-up', 'Jump up, lower in 4-5".'],
    ['Overhand pull-up'],
    ['Weighted pull-up', 'Weighted backpack. Same movement as a standard pull-up.'],
  ),
  chinup: e(
    'Chin-up',
    ['Underhand grip, shoulder width', 'Elbows toward your hips', 'Chin over the bar'],
    ['Negative chin-up', 'Underhand grip. Jump up, lower in 4-5".'],
    ['Chin-up'],
    ['Weighted chin-up', WEIGHTED],
  ),
  'australian-row': e(
    'Australian row',
    [
      'Body rigid from ankles to head',
      'Pull your chest to the bar',
      'Squeeze your shoulder blades at the top',
    ],
    ['Australian row, more upright body', 'The more vertical your body, the easier it is.'],
    ['Australian row'],
    ['Feet-elevated Australian row', FEET_ON_CHAIR],
  ),
  'scapular-pullup': same(
    'Scapular pull-up',
    [
      'Arms straight throughout the movement',
      'Pull your shoulder blades down toward your back pockets',
      'Raise your body a few centimetres',
    ],
    ['Scapular pull-up'],
  ),
  'dead-hang': e(
    'Dead hang',
    ['Thumb wrapped around the bar', 'Active shoulders, don’t sink', 'Breathe steadily'],
    ['Dead hang'],
    ['Dead hang'],
    ['One-arm dead hang'],
  ),
  bulgarian: e(
    'Bulgarian split squat',
    [
      'Rear foot on a chair or step',
      'Torso leaning slightly forward',
      'Front knee in line with your foot',
    ],
    ['Split squat'],
    ['Bulgarian split squat', 'The image shows dumbbells: do it bodyweight.'],
    [
      'Bulgarian split squat, 3" descent',
      'The image shows dumbbells: use a backpack or just bodyweight.',
    ],
  ),
  squat: e(
    'Squat',
    [
      'Feet shoulder-width apart',
      'Neutral back on the way down',
      'Push through your whole foot, heels down',
    ],
    ['Bodyweight squat'],
    ['Slow squat, 3" descent'],
    ['Squat with 3" pause'],
  ),
  'glute-bridge': e(
    'Glute bridge',
    [
      'Feet close to your glutes',
      'Drive through your heels',
      'Hold 1" at the top squeezing your glutes',
    ],
    ['Glute bridge'],
    ['Single-leg glute bridge'],
    ['Single-leg glute bridge with 2" pause'],
  ),
  'calf-raise': e(
    'Calf raise',
    ['Balls of your feet on a step', 'Rise as high as possible', 'Lower slowly below the step'],
    ['Floor calf raise'],
    ['Step calf raise', 'Balls of your feet on a step.'],
    ['Single-leg step calf raise', 'Balls of your feet on a step.'],
  ),
  'leg-raise': e(
    'Leg raise',
    [
      'Pelvis slightly tucked',
      'Legs straight, lift without momentum',
      'Lower in 2-3" without swinging',
    ],
    ['Lying leg raise'],
    ['Hanging leg raise'],
    ['Toes to bar'],
  ),
  'jump-squat': e(
    'Jump squat',
    [
      'Squat to 90° and jump straight up',
      'Land softly, toes then whole foot',
      'Stop the set if your form breaks down',
    ],
    ['Jump squat'],
    ['Jump squat'],
    ['Rocket jump'],
  ),
  lunge: e(
    'Walking lunge',
    [
      'Long stride, upright torso',
      'Rear knee close to the floor',
      'Front knee in line with your foot',
    ],
    ['Walking lunge'],
    ['Walking lunge'],
    ['Walking lunge with backpack', WEIGHTED],
  ),
  pistol: e(
    'Pistol squat',
    [
      'Free leg straight out in front',
      'Lean your torso forward as a counterweight',
      'Lower under control, heel down',
    ],
    ['Single-leg chair squat', 'Sit down and stand up on one leg, with support.'],
    ['Assisted pistol squat', 'Hold on to a wall or an upright.'],
    ['Pistol squat'],
  ),
  nordic: e(
    'Nordic curl',
    [
      'Ankles locked, knees on a soft surface',
      'Body rigid from knees to head',
      'Lower as slowly as possible',
    ],
    ['Heavily assisted Nordic curl', 'Use your hands for the whole way up.'],
    ['Assisted Nordic curl', 'Use your hands to push back up.'],
    ['Nordic curl'],
  ),
  'side-plank': same(
    'Side plank',
    ['Elbow under your shoulder', 'Hips high, body in a straight line', 'Don’t rotate your torso'],
    ['Side plank'],
  ),
  pushup: e(
    'Push-up: progression',
    [
      'Hands under your shoulders',
      'Body in a straight line, glutes squeezed',
      'Chest a fist away from the floor',
    ],
    ['Push-up'],
    ['Wide push-up'],
    ['One-arm push-up'],
  ),
  'l-sit': e(
    'L-sit',
    ['Push your shoulders down', 'Arms locked', 'Legs together, toes pointed'],
    ['Support hold', 'The image shows raised legs: for the support hold keep them on the floor.'],
    ['Tuck L-sit', 'Keep your knees tucked up high.'],
    ['L-sit'],
  ),
  hollow: e(
    'Hollow body hold',
    [
      'Lower back pressed into the floor',
      'Arms and legs straight, shoulder blades off the floor',
      'If your lower back lifts, raise your legs',
    ],
    ['Bent-knee hollow hold'],
    ['Hollow hold'],
    ['Hollow hold, arms overhead'],
  ),
  'clock-pushup': e(
    'Push-up: hand variations',
    [
      'Body in a straight line, hands about shoulder width',
      'Chest toward the floor on the way down',
      'Push hard until your elbows are straight',
    ],
    ['Wide and close-grip push-up'],
    ['Clock push-up'],
    ['Clock push-up with 2" pause', '2" pause with your chest near the floor.'],
  ),
  'body-up': e(
    'Body-up',
    [
      'Start in a forearm plank',
      'Push up onto your palms until your elbows are straight',
      'Body rigid, hips still',
    ],
    ['Kneeling body-up', 'Knees on the floor.'],
    ['Body-up'],
    ['Body-up with 2" pause', '2" pause with straight elbows.'],
  ),
  'vbar-pullup': e(
    'Neutral-grip pull-up',
    [
      'Neutral grip, chest out',
      'Bring your chest toward the bar',
      'Lower under control, arms straight',
    ],
    ['Band-assisted pull-up', 'Band looped around the bar and under your foot.'],
    ['Neutral-grip pull-up', 'You need V-handles. Without them, use an overhand grip.'],
    ['Neutral-grip pull-up with 2" pause', '2" pause with your chin over the bar.'],
  ),
  superman: e(
    'Posterior chain',
    [
      'Lying face down, arms forward',
      'Lift arms, legs and chest together',
      'Hold 2" at the top without craning your neck',
    ],
    ['Superman'],
    ['Superman with 2" pause'],
    [
      'Bodyweight hyperextension',
      'You need a raised surface and something to hold your legs down.',
    ],
  ),
  'step-up': e(
    'Step-up',
    [
      'Stable chair or step',
      'Push with the top leg, no momentum',
      'Drive the opposite knee up high',
    ],
    ['Step-up'],
    ['High-knee step-up'],
    ['Step-up with backpack', WEIGHTED],
  ),
  'split-jump': e(
    'Split jump',
    [
      'Start in a lunge, rear knee near the floor',
      'Jump straight up and land back in a lunge',
      'Land softly, knee in line with your foot',
    ],
    ['Split jump'],
    ['Split jump'],
    ['Scissors jump', 'Switch legs in the air.'],
  ),
  'plyo-jumps': e(
    'Plyometric jumps',
    [
      'Swing your arms, jump explosively',
      'Land softly with bent knees',
      'Fully recover between reps',
    ],
    ['Standing long jump'],
    ['Bench jump', 'Jump over a bench or a low step.'],
    ['Knee tuck jump'],
  ),
  'lateral-bound': e(
    'Lateral bounds',
    [
      'Start in a half squat',
      'Jump sideways as far as possible',
      'Immediately bound back to the other side',
    ],
    ['Lateral bounds'],
    ['Lateral bounds'],
    ['Lateral bounds with 2" stuck landing'],
  ),
  'glute-kickback': e(
    'Glute kickback',
    [
      'On all fours, flat back',
      'Kick your heel toward the ceiling, knee at 90°',
      'Squeeze your glute at the top',
    ],
    ['Glute kickback'],
    ['Glute kickback'],
    ['Glute kickback with 2" pause'],
  ),
  'mountain-climber': same(
    'Mountain climber',
    [
      'Hands under your shoulders, body in a straight line',
      'Alternate driving your knees to your chest',
      'Stable hips',
    ],
    ['Mountain climber'],
  ),
  'dead-bug': e(
    'Dead bug',
    [
      'Lower back pressed into the floor',
      'Extend opposite arm and leg',
      'Return without lifting your lower back',
    ],
    ['Dead bug'],
    ['Dead bug'],
    ['Dead bug', 'Slow descent, 3" per side.'],
  ),
  bicycle: same(
    'Bicycle crunch',
    [
      'Lower back pressed into the floor',
      'Elbow toward the opposite knee',
      'Slow, controlled movement',
    ],
    ['Bicycle crunch'],
  ),
  'russian-twist': e(
    'Russian twist',
    ['Torso in a V, straight back', 'Rotate your torso, not just your arms', 'Feet down or raised'],
    ['Russian twist'],
    ['Russian twist'],
    ['Russian twist with backpack', 'Weighted backpack, feet raised.'],
  ),
  'chest-dip': e(
    'Chest dip',
    [
      'Torso leaning forward',
      'Elbows slightly flared',
      'Lower until you feel a stretch in your chest',
    ],
    ['Incline wide push-up', 'Hands on a raised surface.'],
    ['Chest dip, torso forward'],
    ['Weighted chest dip', WEIGHTED],
  ),
  'archer-pushup': e(
    'Unilateral push-up',
    [
      'Wide hands, body in a straight line',
      'Lower to one side, the other arm stays straight',
      'Alternate sides every rep',
    ],
    ['Wide push-up'],
    ['Archer push-up'],
    ['One-arm push-up'],
  ),
  'handstand-hold': e(
    'Wall handstand',
    [
      'Hands about 15 cm from the wall',
      'Push the floor away, shoulders high',
      'Body in a straight line, abs tight',
    ],
    ['Pike hold, feet on the floor'],
    [
      'Chest-to-wall handstand hold',
      'The image shows hands on parallettes: do it against the wall.',
    ],
    ['Back-to-wall handstand hold', 'Back facing the wall. The image shows hands on parallettes.'],
  ),
  'row-supinato': e(
    'Underhand Australian row',
    [
      'Palms facing you, shoulder width',
      'Body rigid, chest to the bar',
      'Elbows close to your torso',
    ],
    ['Underhand row, more upright body', 'Underhand grip: the frames show an overhand grip.'],
    ['Underhand Australian row', 'Underhand grip: the frames show an overhand grip.'],
    ['Feet-elevated underhand row', 'Feet on a chair, underhand grip.'],
  ),
  'side-chin': e(
    'Unilateral pull-up',
    [
      'Wide grip, chest out',
      'Pull toward one hand, the other arm stays extended',
      'Alternate sides',
    ],
    ['Chin-up'],
    ['Side-to-side pull-up'],
    ['Archer pull-up'],
  ),
  'reverse-lunge': e(
    'Reverse lunge',
    [
      'Cross-behind step back',
      'Upright torso, weight on the front foot',
      'Push through your front heel',
    ],
    ['Curtsy reverse lunge'],
    ['Curtsy reverse lunge'],
    ['Reverse lunge with backpack', WEIGHTED],
  ),
  'floor-ghr': e(
    'Floor glute-ham raise',
    ['Body rigid from knees to head', 'Lower slowly forward', 'Pull back up with your hamstrings'],
    ['Floor glute-ham raise', FLOOR_GHR],
    ['Floor glute-ham raise', FLOOR_GHR],
    ['Floor glute-ham raise, 4" descent', FLOOR_GHR],
  ),
  'table-row': e(
    'Under-table row',
    [
      'Sturdy table: make sure it holds your weight',
      'Body rigid, chest toward the table edge',
      'Squeeze your shoulder blades at the top',
    ],
    ['Under-table row, bent knees', TABLE_ROW],
    ['Under-table row', TABLE_ROW],
    ['Feet-elevated under-table row', 'Feet on a chair. The image shows a bar: use the table.'],
  ),
  'backpack-row': e(
    'Two-hand backpack row',
    [
      'Torso bent over, flat back',
      'Pull the backpack toward your belly button',
      'Squeeze your shoulder blades at the top',
    ],
    ['Two-hand backpack row', PACK_DUMBBELLS],
    ['Two-hand backpack row', PACK_DUMBBELLS],
    ['Backpack row, 2" pause', `2" pause at the top. ${PACK_DUMBBELLS}`],
  ),
  'backpack-row-single': e(
    'One-arm backpack row',
    [
      'One hand on a chair or table, flat back',
      'Pull the backpack toward your hip',
      'Don’t rotate your torso',
    ],
    ['One-arm backpack row', PACK_DUMBBELL],
    ['One-arm backpack row', PACK_DUMBBELL],
    ['One-arm backpack row, 3" descent', PACK_DUMBBELL],
  ),
  'backpack-curl': e(
    'Backpack curl',
    [
      'Elbows pinned to your sides',
      'Lift without swinging your torso',
      'Lower in 3" to straight arms',
    ],
    ['Backpack curl', PACK_CURL],
    ['Backpack curl', PACK_CURL],
    ['Backpack curl, 4" descent', PACK_CURL],
  ),
  'backpack-hammer-curl': e(
    'Backpack hammer curl',
    ['Neutral grip, thumbs up', 'Elbows pinned to your sides', 'Lower slowly'],
    ['Backpack hammer curl', 'The image shows dumbbells: use a backpack.'],
    ['Backpack hammer curl', 'The image shows dumbbells: use a backpack.'],
    ['Backpack hammer curl, 4" descent', 'The image shows dumbbells: use a backpack.'],
  ),
  'backpack-pullover': e(
    'Backpack pullover',
    [
      'Lying down, arms almost straight',
      'Bring the backpack behind your head, then back over your chest',
      'Ribs down, lower back pressed into the floor',
    ],
    ['Backpack pullover', 'The image shows a dumbbell and a bench: use a backpack on the floor.'],
    ['Backpack pullover', 'The image shows a dumbbell and a bench: use a backpack on the floor.'],
    ['Backpack pullover, 2" pause', `2" pause at the bottom. ${PACK_DUMBBELL}`],
  ),
  'reverse-fly': e(
    'Rear delt raise',
    [
      'Torso bent over, flat back',
      'Open your arms with elbows slightly bent',
      'Squeeze your shoulder blades at the top',
    ],
    ['Rear delt raise with bottles', 'The image shows dumbbells: use two water bottles.'],
    ['Rear delt raise with bottles', 'The image shows dumbbells: use two water bottles.'],
    [
      'Rear delt raise, 2" pause',
      '2" pause at the top. Use two water bottles or a book in each hand.',
    ],
  ),
  'reverse-plank': same(
    'Reverse plank',
    [
      'Hands behind your hips, fingers forward',
      'Push your hips up into a straight line',
      'Neutral neck',
    ],
    ['Reverse plank'],
  ),
  'reverse-crunch': e(
    'Reverse crunch',
    [
      'Lower back pressed into the floor',
      'Bring your knees to your chest lifting your hips',
      'Lower slowly, without swinging',
    ],
    ['Reverse crunch'],
    ['Reverse crunch'],
    ['Reverse crunch, 3" descent', 'The image shows an incline bench: do it on the floor.'],
  ),

  // ---------- Elastici ----------
  'band-lat-pulldown': band(
    'Band lat pulldown',
    [
      'Band anchored high, kneel under the anchor',
      'Pull your elbows toward your ribs',
      'Chest out, shoulders down',
    ],
    BAND_ANCHORED,
  ),
  'band-curl': band(
    'Band curl',
    ['Stand on the band', 'Elbows pinned to your sides', 'Lower in 3" to straight arms'],
    BAND_STAND,
  ),
  'band-hammer-curl': band(
    'Band hammer curl',
    ['Stand on the band, neutral grip', 'Elbows pinned to your sides', 'Lower slowly'],
    BAND_STAND,
  ),
  'band-row': band(
    'Band row',
    [
      'Band anchored at chest height',
      'Pull toward your belly button, shoulder blades together',
      'Straight back, no swinging',
    ],
    BAND_ANCHORED,
  ),
  'band-row-single': band(
    'One-arm band row',
    [
      'Band anchored at chest height',
      'Pull your elbow back, close to your torso',
      'Don’t rotate your torso',
    ],
    BAND_ANCHORED,
  ),
  'band-face-pull': band(
    'Band face pull',
    [
      'Band anchored at face height',
      'Pull toward your forehead, elbows high',
      'Rotate your hands outward',
    ],
    BAND_ANCHORED,
  ),
  'band-pull-apart': band('Band pull-apart', [
    'Band taut in front of your chest, arms straight',
    'Open your arms until they line up with your chest',
    'Squeeze your shoulder blades',
  ]),
  'band-lateral-raise': band('Band lateral raise', [
    'Stand on the band, elbows slightly bent',
    'Raise your arms out to the side to shoulder height',
    'Lower slowly',
  ]),
  'band-shoulder-press': band('Band shoulder press', [
    'Stand on the band, hands at shoulder height',
    'Press up to straight arms',
    'Abs tight, neutral back',
  ]),
  'band-pushdown': band(
    'Band triceps pushdown',
    ['Band anchored high', 'Elbows pinned to your sides', 'Extend to straight arms'],
    BAND_ANCHORED,
  ),
  'band-chest-fly': band('Band chest fly', [
    'Band anchored behind you at chest height',
    'Bring your hands together in front, arms slightly bent',
    'Squeeze your chest',
  ]),
  'band-squat': band('Band squat', [
    'Stand on the band, hands at shoulder height',
    'Lower with a neutral back',
    'Push through your whole foot',
  ]),
  'band-good-morning': band('Band good morning', [
    'Stand on the band, band behind your neck',
    'Push your hips back, flat back',
    'Come back up squeezing your glutes',
  ]),
  'band-glute-bridge': band('Band glute bridge', [
    'Band above your knees',
    'Push your knees outward',
    'Hold 1" at the top',
  ]),
  'band-lateral-walk': band('Band lateral walk', [
    'Band above your knees or at your ankles',
    'Half squat, side steps',
    'Knees in line with your feet',
  ]),
  'band-ham-curl': band(
    'Band leg curl',
    ['Band anchored in front of your feet', 'Pull your heels toward your glutes', 'Return slowly'],
    'The image shows someone seated on a bench: sit on the floor or on a chair.',
  ),
  'band-calf-raise': band('Band calf raise', [
    'Stand on the band',
    'Rise onto your toes as high as possible',
    'Lower slowly',
  ]),

  // ---------- Palestra ----------
  'bench-press': e(
    'Bench press',
    [
      'Shoulder blades retracted and depressed, feet on the floor',
      'Bar over the nipple line, elbows at 45-60°',
      'Lower in 2-3" and press without lifting your glutes',
    ],
    ['Smith machine bench press', 'Adjustable bench set flat inside the rack.'],
    ['Barbell bench press', 'Safety arms just below chest height.'],
    ['Paused bench press', '1" pause on the chest, then press. No bouncing.'],
  ),
  'incline-press': e(
    'Incline press',
    [
      'Backrest at 30°: steeper works the shoulders more',
      'Dumbbells over your upper chest',
      'At the bottom you feel a stretch, not shoulder pain',
    ],
    ['Smith machine incline press'],
    ['Incline dumbbell press'],
    ['Incline dumbbell press, 3" descent', '3" descent, 1" pause at the bottom.'],
  ),
  'db-bench': e(
    'Dumbbell bench press',
    [
      'Get the dumbbells into position by resting them on your knees',
      'Wrists over elbows throughout the movement',
      'Bring them together at the top without clanking',
    ],
    ['Neutral-grip dumbbell press', 'Palms facing each other: easier on the shoulders.'],
    ['Dumbbell bench press'],
    ['Dumbbell bench press, 3" descent', '3" descent, explosive press.'],
  ),
  'chest-press': e(
    'Chest press',
    [
      'Seat adjusted so the handles are at chest height',
      'Back against the pad, shoulder blades squeezed',
      'Don’t lock your elbows at the end',
    ],
    ['Chest press (multi-station)'],
    ['Chest press (multi-station)'],
    [
      'Chest press, 4" descent',
      'Last set: to failure, then drop the weight by 30% and keep going.',
    ],
  ),
  'pec-fly': e(
    'Pec deck',
    [
      'Seat set so the handles are at shoulder height',
      'Elbows slightly bent and fixed',
      'Close as if hugging, open until you feel a stretch',
    ],
    ['Pec deck'],
    ['Pec deck'],
    ['Pec deck, 2" pause', '2" pause with arms closed.'],
  ),
  'shoulder-press': e(
    'Shoulder press',
    [
      'Abs tight, no arching of the lower back',
      'Elbows slightly in front of your torso',
      'Press until your arms are straight overhead',
    ],
    ['Seated Smith machine shoulder press', 'Bench with upright backrest inside the rack.'],
    ['Seated dumbbell shoulder press'],
    ['Standing barbell military press', 'Start from the rack with the bar at collarbone height.'],
  ),
  'lateral-raise': e(
    'Lateral raise',
    [
      'Elbows slightly bent, pinky no higher than thumb',
      'Raise to shoulder height',
      'Lower slowly, no swinging with your torso',
    ],
    ['Dumbbell lateral raise', 'Start with 4-6 kg from the chrome rack.'],
    ['Dumbbell lateral raise'],
    [
      'One-arm cable lateral raise',
      'Low pulley, single handle. Constant tension even at the bottom.',
    ],
  ),
  'reverse-fly-machine': e(
    'Reverse fly',
    [
      'Same machine as the pec deck: sit facing the backrest',
      'Arms straight, open by bringing your hands back',
      'Shoulders down, don’t shrug toward your ears',
    ],
    ['Machine reverse fly'],
    ['Machine reverse fly'],
    ['Machine reverse fly, 2" pause', '2" pause with arms open.'],
  ),
  'face-pull': e(
    'Face pull',
    [
      'Pulley at forehead height, rope',
      'Pull toward your face, separating your hands',
      'Elbows high, finish by rotating your hands back',
    ],
    ['Cable face pull'],
    ['Cable face pull'],
    ['Cable face pull, 2" pause', '2" pause with hands near your ears.'],
  ),
  'triceps-cable': e(
    'Cable triceps',
    ['High pulley', 'Elbows pinned to your sides', 'Fully extend, return in 2"'],
    ['Cable pushdown'],
    ['Rope pushdown', 'Spread the rope ends apart at the bottom.'],
    ['Overhead cable extension', 'Back to the machine, rope behind your head.'],
  ),
  'db-curl': e(
    'Dumbbell curl',
    [
      'Elbows still, don’t bring them forward',
      'Turn your palm up as you lift',
      'Lower in 3" to a straight arm',
    ],
    ['Alternating dumbbell curl'],
    ['Dumbbell curl'],
    ['Incline bench curl', 'Backrest at 45-60°, arms hanging behind your torso.'],
  ),
  'hammer-curl': e(
    'Hammer curl',
    ['Palms facing each other', 'Elbows close to your torso', 'No swinging with your back'],
    ['Dumbbell hammer curl'],
    ['Dumbbell hammer curl'],
    ['Cable rope hammer curl', 'Low pulley.'],
  ),
  'cable-lat-pulldown': e(
    'Cable lat pulldown',
    [
      'High pulley, kneeling in front of the machine',
      'Pull your elbow toward your side',
      'Chest out, shoulder down',
    ],
    [
      'One-arm cable lat pulldown',
      'Kneeling, single handle. Do all reps with one arm, then the other.',
    ],
    ['One-arm cable lat pulldown', 'Kneeling, single handle.'],
    ['One-arm lat pulldown, 1" pause', '1" pause with your elbow at your side.'],
  ),
  'barbell-row': e(
    'Barbell row',
    [
      'Torso at 45°, neutral back',
      'Pull the bar toward your belly button',
      'Lower under control, without losing position',
    ],
    ['Smith machine row'],
    ['Barbell row'],
    ['Barbell row, 1" pause', '1" pause with the bar at your stomach.'],
  ),
  'db-row': e(
    'Dumbbell row',
    [
      'Flat back, stable support on the bench',
      'Pull your elbow toward your hip, not upward',
      'Get a full stretch at the bottom',
    ],
    ['Chest-supported incline dumbbell row', 'Chest on the backrest at 30-45°.'],
    ['One-arm row', 'Knee and hand on the bench.'],
    ['One-arm row, 3" descent', 'Heavy dumbbells: 22-26 kg.'],
  ),
  'cable-row': e(
    'Cable row',
    [
      'Low pulley, single handle',
      'Torso still, pull your elbow back',
      'Let your shoulder blade stretch forward',
    ],
    ['One-arm cable row'],
    ['One-arm cable row'],
    ['Cable row, 2" pause', '2" pause with shoulder blade retracted.'],
  ),
  'back-squat': e(
    'Squat',
    [
      'Safety arms just below your depth',
      'Knees tracking your toes',
      'Lower at least until your hips are level with your knees',
    ],
    ['Smith machine squat', 'Feet slightly in front of the bar.'],
    ['Barbell back squat'],
    ['Paused back squat, 2"', '2" pause at the bottom, then stand up.'],
  ),
  rdl: e(
    'Romanian deadlift',
    [
      'Knees slightly bent and fixed',
      'Push your hips back, weight close to your legs',
      'Lower as long as your back stays neutral',
    ],
    ['Dumbbell Romanian deadlift'],
    ['Barbell Romanian deadlift'],
    ['Deficit Romanian deadlift', 'Standing on a plate: more hamstring stretch.'],
  ),
  deadlift: e(
    'Deadlift',
    [
      'Bar over mid-foot, shins close',
      'Chest up, neutral back before you pull',
      'Push the floor away, hips and shoulders rise together',
    ],
    ['Rack pull', 'Bar on the rack safety arms just below the knee.'],
    ['Barbell deadlift'],
    ['Deficit deadlift', 'Standing on a 2-5 cm plate.'],
  ),
  'split-squat': e(
    'Split squat',
    [
      'Upright torso, weight on the front leg',
      'Rear knee drops toward the floor',
      'Push through your front heel',
    ],
    ['Dumbbell split squat'],
    ['Smith machine Bulgarian split squat', 'Rear foot on the bench.'],
    ['Dumbbell Bulgarian split squat', 'Rear foot on the bench, a dumbbell in each hand.'],
  ),
  'db-lunge': e(
    'Dumbbell lunge',
    [
      'Long stride, upright torso',
      'Rear knee brushes the floor',
      'Push through the heel of your front leg',
    ],
    ['Dumbbell reverse lunge'],
    ['Dumbbell forward lunge'],
    ['Deficit reverse lunge', 'Front foot on a plate.'],
  ),
  'leg-extension': e(
    'Leg extension',
    [
      'Knee aligned with the machine pivot',
      'Roller above your ankle',
      'Fully extend, lower in 2-3"',
    ],
    ['Leg extension'],
    ['Leg extension', '1" pause with the leg straight.'],
    ['Single-leg leg extension'],
  ),
  'leg-curl': e(
    'Leg curl',
    [
      'Same machine as the leg extension: move the roller under your calves',
      'Lock your thighs with the pad',
      'Bend all the way, return in 3"',
    ],
    ['Seated leg curl'],
    ['Seated leg curl'],
    ['Leg curl, 4" descent', '4" descent. Last set with a drop set.'],
  ),
  'hip-thrust': e(
    'Hip thrust',
    [
      'Shoulder blades on the bench edge, shins vertical at the top',
      'Chin toward your chest, pelvis tucked',
      'Squeeze your glutes at the top without arching your back',
    ],
    ['Barbell glute bridge', 'From the floor, no bench. Put a pad under the bar.'],
    ['Barbell hip thrust'],
    ['Hip thrust, 2" pause', '2" pause at the top.'],
  ),
  'pull-through': e(
    'Cable pull-through',
    [
      'Low pulley, rope between your legs, back to the machine',
      'Push your hips back like in a deadlift',
      'Come back up squeezing your glutes',
    ],
    ['Cable pull-through'],
    ['Cable pull-through'],
    ['Pull-through, 2" pause', '2" pause at the top.'],
  ),
  'gym-calf': e(
    'Calf raise',
    [
      'Balls of your feet on a plate or a raised surface',
      'Lower to a low heel, 1" pause',
      'Rise as high as you can',
    ],
    ['Dumbbell calf raise'],
    ['Smith machine calf raise'],
    ['Smith machine calf raise, 2" pause', '2" at the bottom and 1" at the top.'],
  ),
  'cable-crunch': e(
    'Cable crunch',
    [
      'High pulley, rope behind your head, kneeling',
      'Curl your back bringing your elbows toward your thighs',
      'Your hips stay still',
    ],
    ['Cable crunch'],
    ['Cable crunch'],
    ['Cable crunch, 2" pause', '2" pause at the bottom.'],
  ),
  pallof: e(
    'Cable anti-rotation',
    [
      'Pulley at chest height, standing side-on to the machine',
      'Press your arms forward without letting it rotate you',
      'Abs and glutes tight',
    ],
    ['Pallof press'],
    ['Pallof press', '2" hold with arms straight.'],
    ['Cable woodchop', 'Rotate from the hips, arms almost straight.'],
  ),
};

export const SESSION_TITLES_EN: Record<string, string> = {
  'lun-push': 'Push',
  'mar-pull': 'Pull',
  'mer-gambe': 'Legs + core',
  'ven-upper': 'Upper',
  'sab-gambe': 'Legs + core',
  'pal-lun-push': 'Push',
  'pal-mar-pull': 'Pull',
  'pal-mer-gambe': 'Legs · quads',
  'pal-ven-upper': 'Upper',
  'pal-sab-gambe': 'Legs · glutes and hamstrings',
};

export const WARMUP_EN: Record<'palestra' | 'casa', string[]> = {
  casa: [
    'Arm and shoulder circles, 30"',
    'Cat-cow and thoracic rotations, 10 reps',
    'Scapular pull-ups on the bar or scapular push-ups on the floor, 2x10',
    '1 light set of the first exercise, at half effort',
  ],
  palestra: [
    '5 min on the bike, elliptical or treadmill at an easy pace',
    'Arm circles, thoracic rotations and 10 bodyweight squats',
    'Light face pulls or reverse flies, 1x15 (on upper-body days)',
    '2 warm-up sets on the first exercise: 50% x 10, 75% x 5',
  ],
};
