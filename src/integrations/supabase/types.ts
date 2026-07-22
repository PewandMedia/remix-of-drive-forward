export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      filiale_photos: {
        Row: {
          active: boolean
          alt: string | null
          caption: string | null
          created_at: string
          filiale_id: string
          id: string
          image_url: string
          kicker: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          alt?: string | null
          caption?: string | null
          created_at?: string
          filiale_id: string
          id?: string
          image_url: string
          kicker?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          alt?: string | null
          caption?: string | null
          created_at?: string
          filiale_id?: string
          id?: string
          image_url?: string
          kicker?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      first_aid_dates: {
        Row: {
          active: boolean
          created_at: string
          ends_at: string | null
          id: string
          note: string | null
          starts_at: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          ends_at?: string | null
          id?: string
          note?: string | null
          starts_at: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          ends_at?: string | null
          id?: string
          note?: string | null
          starts_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      first_aid_info: {
        Row: {
          active: boolean
          dates: string | null
          description: string
          duration: string | null
          id: string
          price: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          dates?: string | null
          description: string
          duration?: string | null
          id?: string
          price?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          dates?: string | null
          description?: string
          duration?: string | null
          id?: string
          price?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          address: string | null
          birth_date: string | null
          city: string | null
          contact_pref: string | null
          created_at: string
          email: string | null
          first_aid_interest: boolean
          first_name: string | null
          id: string
          last_name: string | null
          license_class: string | null
          message: string | null
          name: string
          phone: string | null
          postal_code: string | null
          status: Database["public"]["Enums"]["inquiry_status"]
          type: Database["public"]["Enums"]["inquiry_type"]
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          contact_pref?: string | null
          created_at?: string
          email?: string | null
          first_aid_interest?: boolean
          first_name?: string | null
          id?: string
          last_name?: string | null
          license_class?: string | null
          message?: string | null
          name: string
          phone?: string | null
          postal_code?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          type?: Database["public"]["Enums"]["inquiry_type"]
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          contact_pref?: string | null
          created_at?: string
          email?: string | null
          first_aid_interest?: boolean
          first_name?: string | null
          id?: string
          last_name?: string | null
          license_class?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          type?: Database["public"]["Enums"]["inquiry_type"]
        }
        Relationships: []
      }
      instagram_posts: {
        Row: {
          active: boolean
          caption: string | null
          created_at: string
          id: string
          image_url: string
          post_url: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          post_url?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          post_url?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      location_hours: {
        Row: {
          created_at: string
          day_label: string
          id: string
          location_id: string
          sort_order: number
          time_label: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_label: string
          id?: string
          location_id: string
          sort_order?: number
          time_label: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_label?: string
          id?: string
          location_id?: string
          sort_order?: number
          time_label?: string
          updated_at?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          active: boolean
          button_text: string
          created_at: string
          extra_line: string | null
          headline: string | null
          id: string
          image_url: string | null
          items: string[]
          price_blocks: Json
          price_label: string | null
          short_desc: string | null
          show_on_home: boolean
          sort_order: number
          subline: string | null
          title: string | null
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          active?: boolean
          button_text?: string
          created_at?: string
          extra_line?: string | null
          headline?: string | null
          id?: string
          image_url?: string | null
          items?: string[]
          price_blocks?: Json
          price_label?: string | null
          short_desc?: string | null
          show_on_home?: boolean
          sort_order?: number
          subline?: string | null
          title?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          active?: boolean
          button_text?: string
          created_at?: string
          extra_line?: string | null
          headline?: string | null
          id?: string
          image_url?: string | null
          items?: string[]
          price_blocks?: Json
          price_label?: string | null
          short_desc?: string | null
          show_on_home?: boolean
          sort_order?: number
          subline?: string | null
          title?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean
          category: string
          created_at: string
          description: string | null
          id: string
          offer_active: boolean
          offer_label: string | null
          offer_note: string | null
          offer_valid_from: string | null
          offer_valid_until: string | null
          old_price: string | null
          price: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          category: string
          created_at?: string
          description?: string | null
          id?: string
          offer_active?: boolean
          offer_label?: string | null
          offer_note?: string | null
          offer_valid_from?: string | null
          offer_valid_until?: string | null
          old_price?: string | null
          price: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          offer_active?: boolean
          offer_label?: string | null
          offer_note?: string | null
          offer_valid_from?: string | null
          offer_valid_until?: string | null
          old_price?: string | null
          price?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          active: boolean
          bio: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          role: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          bio?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          role: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          bio?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      inquiry_status: "neu" | "in_bearbeitung" | "erledigt"
      inquiry_type:
        | "kontakt"
        | "anmeldung"
        | "angebot"
        | "erste_hilfe"
        | "sonstiges"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      inquiry_status: ["neu", "in_bearbeitung", "erledigt"],
      inquiry_type: [
        "kontakt",
        "anmeldung",
        "angebot",
        "erste_hilfe",
        "sonstiges",
      ],
    },
  },
} as const
