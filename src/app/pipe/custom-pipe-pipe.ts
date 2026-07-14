import { Pipe, PipeTransform } from '@angular/core';
import { config } from 'rxjs';

export type Code = 'BY' | 'RU' | 'PL';
interface CountryConfig {
  code: string;
  pattern: RegExp;
  format: (digits: string) => string;
}

@Pipe({
  name: 'formatPhone',
  standalone: true
})
export class FormatPhone implements PipeTransform {
  private readonly countryConfigs: Record<Code, CountryConfig> = {
    'BY': { 
      code:'+375',
      pattern:/^(\d{2})(\d{3})(\d{2})(\d{2})$/,
      format: (digits: string)=>{
        const match = digits.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
        if (!match) return digits;
        return `+375 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`; 
      }
    },
     'RU': {
      code:'+7',
      pattern:/^(\d{3})(\d{3})(\d{2})(\d{2})$/,
      format: (digits: string)=>{
        const match = digits.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (!match) return digits;
        return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`; 
      }
    },
     'PL': {
      code:'+48',
      pattern:/^(\d{2})(\d{3})(\d{3})$/,
      format: (digits: string)=>{
        const match = digits.match(/^(\d{3})(\d{3})(\d{3})$/);
        if (!match) return digits;
        return `+48 (${match[1]}) ${match[2]}-${match[3]}`; 
      }
    }
  };

  transform(value: string | null | undefined, country: Code = 'BY'): string {
    if (!value){
      return this.getPlaceholder(country);
    }

    try {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 0) {
        return this.getPlaceholder(country);
      }
      const config = this.countryConfigs[country];
      if (!config) {
        return this.getPlaceholder(country);
      }
      if (!config.pattern.test(cleaned)){
      return config.format(cleaned);
      }
      return config.format(cleaned);
    } catch (error) {
      console.warn('FormatPhone error:', error);
      return this.getPlaceholder(country);
    }
  }
  private getPlaceholder(country: Code): string {
    const placeholders: Record < Code, string> = {
      'BY': '+375 (XX) XXX-XX-XX',
      'RU': '+7 (XXX) XXX-XX-XX',
      'PL': '+48 XXX XXX XXX'
    };
    return placeholders[country] || 'Некоректный номер';
  } 
}
