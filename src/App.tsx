import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MiniText, MiniView, Spacing } from '@exercise/mini-app-sdk';

const GOAL_KCAL = 2000;

type Entry = { label: string; emoji: string; kcal: number };

const FOODS: Entry[] = [
  { label: 'Cơm', emoji: '🍚', kcal: 250 },
  { label: 'Phở', emoji: '🍜', kcal: 450 },
  { label: 'Trứng', emoji: '🥚', kcal: 80 },
  { label: 'Chuối', emoji: '🍌', kcal: 100 },
  { label: 'Bánh mì', emoji: '🥖', kcal: 300 },
];

const EXERCISES: Entry[] = [
  { label: 'Chạy 30 phút', emoji: '🏃', kcal: -300 },
  { label: 'Đạp xe 30 phút', emoji: '🚴', kcal: -250 },
  { label: 'Bơi 30 phút', emoji: '🏊', kcal: -350 },
];

export function CalorieCounterApp() {
  const [eaten, setEaten] = useState(0);
  const [burned, setBurned] = useState(0);

  const net = eaten - burned;
  const progress = Math.min(Math.max(net / GOAL_KCAL, 0), 1);
  const over = net > GOAL_KCAL;

  const add = (entry: Entry) => {
    if (entry.kcal >= 0) setEaten((v) => v + entry.kcal);
    else setBurned((v) => v - entry.kcal);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MiniView surface="surface" style={styles.summary}>
        <MiniText style={[styles.net, over && styles.over]}>{net} kcal</MiniText>
        <MiniText variant="small" tone="secondary">
          Mục tiêu {GOAL_KCAL} kcal · Đã ăn {eaten} · Đã đốt {burned}
        </MiniText>
        <MiniView surface="surfaceSelected" style={styles.track}>
          <View style={[styles.fill, over && styles.fillOver, { width: `${progress * 100}%` }]} />
        </MiniView>
      </MiniView>

      <MiniText variant="smallBold">Ăn uống</MiniText>
      <EntryGrid entries={FOODS} onPress={add} />

      <MiniText variant="smallBold">Vận động</MiniText>
      <EntryGrid entries={EXERCISES} onPress={add} />

      <Pressable
        onPress={() => {
          setEaten(0);
          setBurned(0);
        }}
        style={styles.reset}>
        <MiniText variant="link" tone="secondary">
          Đặt lại hôm nay
        </MiniText>
      </Pressable>
    </ScrollView>
  );
}

function EntryGrid({ entries, onPress }: { entries: Entry[]; onPress: (entry: Entry) => void }) {
  return (
    <View style={styles.grid}>
      {entries.map((entry) => (
        <Pressable
          key={entry.label}
          onPress={() => onPress(entry)}
          style={({ pressed }) => [styles.cell, pressed && styles.pressed]}>
          <MiniView surface="surface" style={styles.chip}>
            <MiniText style={styles.emoji}>{entry.emoji}</MiniText>
            <MiniText variant="smallBold">{entry.label}</MiniText>
            <MiniText variant="small" tone="secondary">
              {entry.kcal > 0 ? `+${entry.kcal}` : entry.kcal} kcal
            </MiniText>
          </MiniView>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  summary: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.four,
  },
  net: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: 700,
    fontVariant: ['tabular-nums'],
  },
  over: {
    color: '#FF3B30',
  },
  track: {
    alignSelf: 'stretch',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#FF9500',
  },
  fillOver: {
    backgroundColor: '#FF3B30',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  cell: {
    width: '48%',
  },
  chip: {
    alignItems: 'center',
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  emoji: {
    fontSize: 28,
    lineHeight: 34,
  },
  reset: {
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
