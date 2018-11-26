import Player from "../models/player";
import Phaser from 'phaser';

describe('Testing player model', () => {

    let scene = new Phaser.Scene({});
    it('It should not be null', () => {
     expect(new Player(scene)).toBe('Player');
    });
  });

  console.log(player);