import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Pizza } from '@/types';

export function usePizzas() {
  return useQuery({
    queryKey: ['pizzas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pizzas')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Pizza[];
    },
  });
}
